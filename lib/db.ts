import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error('DATABASE_URL no esta definida en las variables de entorno');
}

const sql = postgres(connectionString, {
    ssl: false,
    max: 10,
});

export default sql;
