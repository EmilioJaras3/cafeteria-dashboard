#!/usr/bin/env python3
"""
Detector de hardcodeo en código Node.js/JavaScript
Identifica URLs, API keys, secrets, credenciales y SQL queries embebidas
"""

import re
import os
import json
from pathlib import Path
from typing import Dict, List, Tuple

class HardcodeDetector:
    def __init__(self, project_path: str):
        self.project_path = Path(project_path)
        self.findings = {
            "urls": [],
            "api_keys": [],
            "credentials": [],
            "sql_queries": [],
            "secrets": [],
            "config_values": []
        }
    
    def detect_urls(self, content: str, filename: str) -> List[Tuple[str, int]]:
        """Detecta URLs hardcodeadas"""
        patterns = [
            r"(?:https?://)[^\s'\"`;,}>\]]*",  # URLs con http/https
            r"localhost[:\/]\d+",                # localhost:puerto
            r"127\.0\.0\.1[:\/]\d+",             # 127.0.0.1:puerto
        ]
        
        matches = []
        for pattern in patterns:
            for match in re.finditer(pattern, content):
                matches.append((match.group(), match.start()))
        
        return matches
    
    def detect_api_keys(self, content: str) -> List[str]:
        """Detecta patrones de API keys"""
        patterns = [
            r"api[_-]?key\s*[:=]\s*['\"]([^'\"]+)['\"]",
            r"secret[_-]?key\s*[:=]\s*['\"]([^'\"]+)['\"]",
            r"token\s*[:=]\s*['\"]([^'\"]+)['\"]",
            r"password\s*[:=]\s*['\"]([^'\"]+)['\"]",
            r"auth\s*[:=]\s*['\"]([^'\"]+)['\"]",
        ]
        
        matches = []
        for pattern in patterns:
            for match in re.finditer(pattern, content, re.IGNORECASE):
                matches.append(match.group())
        
        return matches
    
    def detect_sql_queries(self, content: str) -> List[str]:
        """Detecta SQL queries embebidas"""
        patterns = [
            r"['\"]SELECT\s+.*?['\"]",
            r"['\"]INSERT\s+INTO.*?['\"]",
            r"['\"]UPDATE\s+.*?['\"]",
            r"['\"]DELETE\s+FROM.*?['\"]",
            r"`SELECT\s+.*?`",
            r"`INSERT\s+INTO.*?`",
        ]
        
        matches = []
        for pattern in patterns:
            for match in re.finditer(pattern, content, re.IGNORECASE | re.DOTALL):
                query = match.group()
                if len(query) > 20:  # Solo queries sustanciales
                    matches.append(query[:100] + "..." if len(query) > 100 else query)
        
        return matches
    
    def detect_credentials(self, content: str) -> List[str]:
        """Detecta credenciales de base de datos"""
        patterns = [
            r"user\s*[:=]\s*['\"]([^'\"]+)['\"]",
            r"username\s*[:=]\s*['\"]([^'\"]+)['\"]",
            r"host\s*[:=]\s*['\"]([^'\"]+)['\"]",
            r"database\s*[:=]\s*['\"]([^'\"]+)['\"]",
            r"db_name\s*[:=]\s*['\"]([^'\"]+)['\"]",
        ]
        
        matches = []
        for pattern in patterns:
            for match in re.finditer(pattern, content, re.IGNORECASE):
                matches.append(match.group())
        
        return matches
    
    def scan_file(self, filepath: Path) -> Dict:
        """Escanea un archivo buscando hardcodeo"""
        try:
            with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
        except Exception as e:
            return None
        
        results = {
            "file": str(filepath.relative_to(self.project_path)),
            "urls": self.detect_urls(content, str(filepath)),
            "api_keys": self.detect_api_keys(content),
            "credentials": self.detect_credentials(content),
            "sql_queries": self.detect_sql_queries(content),
        }
        
        # Filtrar resultados vacíos
        results = {k: v for k, v in results.items() if v}
        
        return results
    
    def scan_project(self) -> Dict:
        """Escanea el proyecto completo"""
        extensions = {'.js', '.ts', '.jsx', '.tsx'}
        exclude_dirs = {'.git', 'node_modules', '.env', 'dist', 'build'}
        
        all_results = []
        
        for filepath in self.project_path.rglob('*'):
            # Saltar directorios excluidos
            if any(exc in filepath.parts for exc in exclude_dirs):
                continue
            
            # Procesar solo archivos JS/TS
            if filepath.is_file() and filepath.suffix in extensions:
                results = self.scan_file(filepath)
                if results and any(results.values()):
                    all_results.append(results)
        
        return {
            "total_files_scanned": len(list(self.project_path.rglob('*'))),
            "files_with_hardcode": len(all_results),
            "findings": all_results
        }


def main():
    import sys
    
    if len(sys.argv) < 2:
        print("Uso: python detect_hardcode.py <ruta_del_proyecto>")
        sys.exit(1)
    
    project_path = sys.argv[1]
    
    if not os.path.exists(project_path):
        print(f"Error: Ruta no existe: {project_path}")
        sys.exit(1)
    
    detector = HardcodeDetector(project_path)
    results = detector.scan_project()
    
    print(json.dumps(results, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
