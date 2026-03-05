#!/usr/bin/env python3
"""
Herramienta de migración automática de hardcodeo a configuración
Genera archivos .env y refactoriza código Node.js
"""

import os
import re
import json
from pathlib import Path
from typing import Dict, List, Tuple

class HardcodeMigrator:
    def __init__(self, project_path: str):
        self.project_path = Path(project_path)
        self.env_vars = {}
        self.migrations = []
    
    def extract_database_config(self, content: str) -> Dict:
        """Extrae configuración de base de datos"""
        db_config = {}
        
        patterns = {
            'host': r"(?:host|hostname)\s*[:=]\s*['\"]([^'\"]+)['\"]",
            'port': r"(?:port)\s*[:=]\s*(?:['\"])?(\d+)(?:['\"])?",
            'user': r"(?:user|username)\s*[:=]\s*['\"]([^'\"]+)['\"]",
            'password': r"(?:password|pwd)\s*[:=]\s*['\"]([^'\"]+)['\"]",
            'database': r"(?:database|db|db_name)\s*[:=]\s*['\"]([^'\"]+)['\"]",
        }
        
        for key, pattern in patterns.items():
            match = re.search(pattern, content, re.IGNORECASE)
            if match:
                db_config[key] = match.group(1)
        
        return db_config
    
    def extract_urls(self, content: str) -> Dict[str, str]:
        """Extrae URLs del código"""
        urls = {}
        
        url_patterns = [
            (r"(?:frontend|client).*?['\"](?:https?://[^'\"]+)['\"]", 'FRONTEND_URL'),
            (r"(?:api|base).*?['\"](?:https?://[^'\"]+)['\"]", 'API_URL'),
            (r"(?:external|third)[_-]?(?:api|url).*?['\"](?:https?://[^'\"]+)['\"]", 'EXTERNAL_API_URL'),
            (r"(?:http|https)://localhost[:\d]*", 'LOCAL_URL'),
        ]
        
        for pattern, key in url_patterns:
            match = re.search(pattern, content, re.IGNORECASE)
            if match:
                url = re.search(r"https?://[^'\"`;]+", match.group()).group()
                urls[key] = url
        
        return urls
    
    def extract_api_keys(self, content: str) -> Dict[str, str]:
        """Extrae API keys y secrets"""
        keys = {}
        
        patterns = {
            'STRIPE_KEY': r"stripe\(['\"]sk_([^'\"]+)['\"]",
            'JWT_SECRET': r"(?:jwt|token).*?secret.*?['\"]([^'\"]+)['\"]",
            'API_KEY': r"api[_-]?key.*?['\"]([^'\"]{20,})['\"]",
            'TOKEN': r"(?:auth|access)[_-]?(?:token|key).*?['\"]([^'\"]{20,})['\"]",
        }
        
        for key, pattern in patterns.items():
            matches = re.findall(pattern, content, re.IGNORECASE)
            for i, match in enumerate(matches):
                var_name = key if i == 0 else f"{key}_{i}"
                keys[var_name] = f"sk_{match}" if 'STRIPE' in key else match
        
        return keys
    
    def generate_env_file(self, db_config: Dict, urls: Dict, api_keys: Dict) -> str:
        """Genera contenido del archivo .env"""
        lines = [
            "# Configuración de Base de Datos",
        ]
        
        if db_config:
            for key, value in db_config.items():
                lines.append(f"DB_{key.upper()}={value}")
        else:
            lines.extend([
                "DB_HOST=localhost",
                "DB_PORT=3306",
                "DB_USER=root",
                "DB_PASSWORD=",
                "DB_NAME=antigravity_db",
            ])
        
        lines.extend([
            "",
            "# URLs y Endpoints"
        ])
        
        if urls:
            for key, value in urls.items():
                lines.append(f"{key}={value}")
        else:
            lines.extend([
                "API_BASE_URL=http://localhost:3000",
                "FRONTEND_URL=http://localhost:3001",
                "EXTERNAL_API_URL=",
            ])
        
        lines.extend([
            "",
            "# API Keys y Secrets",
        ])
        
        if api_keys:
            for key, value in api_keys.items():
                lines.append(f"{key}=REEMPLAZAR_CON_VALOR_REAL")
        else:
            lines.extend([
                "JWT_SECRET=tu_jwt_secret_aqui",
                "STRIPE_SECRET_KEY=",
                "API_KEY=",
            ])
        
        lines.extend([
            "",
            "# Configuración General",
            "NODE_ENV=development",
            "PORT=3000",
            "LOG_LEVEL=debug",
        ])
        
        return "\n".join(lines)
    
    def generate_env_example(self) -> str:
        """Genera archivo .env.example sin valores sensibles"""
        return """# Base de datos
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=

# URLs
API_BASE_URL=
FRONTEND_URL=
EXTERNAL_API_URL=

# Secrets
JWT_SECRET=
STRIPE_SECRET_KEY=
API_KEY=

# Configuración
NODE_ENV=development
PORT=3000
LOG_LEVEL=debug
"""
    
    def generate_config_database(self, db_config: Dict) -> str:
        """Genera archivo config/database.js"""
        template = '''require('dotenv').config();

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'antigravity_db',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

connection.connect((err) => {
  if (err) {
    console.error('Error conectando a BD:', err);
    process.exit(1);
  }
  console.log('Conectado a BD exitosamente');
});

module.exports = connection;
'''
        return template
    
    def generate_config_api(self) -> str:
        """Genera archivo config/api.js"""
        return '''require('dotenv').config();

module.exports = {
  environment: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:3000',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3001',
  externalApiUrl: process.env.EXTERNAL_API_URL,
  jwtSecret: process.env.JWT_SECRET,
  stripeKey: process.env.STRIPE_SECRET_KEY,
  apiKey: process.env.API_KEY,
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production'
};
'''
    
    def generate_gitignore_entry(self) -> str:
        """Genera entrada para .gitignore"""
        return """
# Variables de entorno - NUNCA commitear esto
.env
.env.local
.env.*.local
.env.production
"""
    
    def create_migration_report(self) -> str:
        """Crea reporte de migración"""
        report = "# Reporte de Migración de Hardcodeo\n\n"
        report += f"Fecha: {__import__('datetime').datetime.now().isoformat()}\n\n"
        report += "## Archivos Creados\n"
        report += "- .env (archivo de variables de entorno)\n"
        report += "- .env.example (template para otros devs)\n"
        report += "- config/database.js (configuración centralizada de BD)\n"
        report += "- config/api.js (configuración de APIs)\n"
        report += "- MIGRATION.md (este archivo)\n\n"
        
        report += "## Próximos Pasos\n"
        report += "1. Instalar dotenv: `npm install dotenv`\n"
        report += "2. Actualizar tus archivos de rutas para usar config/\n"
        report += "3. Reemplazar queries SQL hardcodeadas\n"
        report += "4. Verificar que .env está en .gitignore\n"
        report += "5. Testear toda la aplicación\n"
        report += "6. Eliminar valores hardcodeados del código original\n\n"
        
        report += "## Valores Encontrados\n"
        if self.env_vars:
            report += "```\n"
            for key, value in self.env_vars.items():
                report += f"{key}={value}\n"
            report += "```\n"
        
        return report
    
    def migrate(self) -> bool:
        """Ejecuta la migración completa"""
        try:
            # Buscar archivos JS/TS para análisis
            js_files = list(self.project_path.rglob('*.js')) + \
                      list(self.project_path.rglob('*.ts'))
            
            if not js_files:
                print("No se encontraron archivos JS/TS")
                return False
            
            print(f"Analizando {len(js_files)} archivos...")
            
            # Analizar archivos
            all_db_configs = {}
            all_urls = {}
            all_api_keys = {}
            
            for js_file in js_files[:5]:  # Limitar a primeros 5 para análisis rápido
                try:
                    with open(js_file, 'r', encoding='utf-8', errors='ignore') as f:
                        content = f.read()
                    
                    db_config = self.extract_database_config(content)
                    urls = self.extract_urls(content)
                    api_keys = self.extract_api_keys(content)
                    
                    all_db_configs.update(db_config)
                    all_urls.update(urls)
                    all_api_keys.update(api_keys)
                    
                except Exception as e:
                    print(f"Error leyendo {js_file}: {e}")
            
            # Crear archivos
            config_dir = self.project_path / 'config'
            config_dir.mkdir(exist_ok=True)
            
            # .env
            env_content = self.generate_env_file(all_db_configs, all_urls, all_api_keys)
            with open(self.project_path / '.env', 'w') as f:
                f.write(env_content)
            print("✓ Creado .env")
            
            # .env.example
            with open(self.project_path / '.env.example', 'w') as f:
                f.write(self.generate_env_example())
            print("✓ Creado .env.example")
            
            # config/database.js
            with open(config_dir / 'database.js', 'w') as f:
                f.write(self.generate_config_database(all_db_configs))
            print("✓ Creado config/database.js")
            
            # config/api.js
            with open(config_dir / 'api.js', 'w') as f:
                f.write(self.generate_config_api())
            print("✓ Creado config/api.js")
            
            # Actualizar .gitignore
            gitignore_path = self.project_path / '.gitignore'
            gitignore_entry = self.generate_gitignore_entry()
            
            if gitignore_path.exists():
                with open(gitignore_path, 'a') as f:
                    f.write(gitignore_entry)
            else:
                with open(gitignore_path, 'w') as f:
                    f.write(gitignore_entry)
            print("✓ Actualizado .gitignore")
            
            # Reporte
            with open(self.project_path / 'MIGRATION.md', 'w') as f:
                f.write(self.create_migration_report())
            print("✓ Creado MIGRATION.md")
            
            return True
            
        except Exception as e:
            print(f"Error durante migración: {e}")
            return False


def main():
    import sys
    
    if len(sys.argv) < 2:
        print("Uso: python migrate_hardcode.py <ruta_del_proyecto>")
        sys.exit(1)
    
    project_path = sys.argv[1]
    
    if not os.path.exists(project_path):
        print(f"Error: Ruta no existe: {project_path}")
        sys.exit(1)
    
    print(f"Iniciando migración en: {project_path}")
    
    migrator = HardcodeMigrator(project_path)
    success = migrator.migrate()
    
    if success:
        print("\n✅ Migración completada exitosamente")
        print("Archivos creados en:", project_path)
    else:
        print("\n❌ Error durante la migración")
        sys.exit(1)


if __name__ == "__main__":
    main()
