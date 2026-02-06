import postgres from 'postgres';

// La cadena de conexión viene de las variables de entorno
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error('DATABASE_URL no está definida en las variables de entorno');
}

// Configuración de la conexión
const sql = postgres(connectionString, {
    ssl: false, // Docker local no usa SSL
    max: 10,    // Máximo de conexiones en el pool
});

export default sql;
