const { Client } = require('pg');
const client = new Client({
    host: process.argv[2],
    port: 5432,
    user: process.argv[3],
    password: process.argv[4],
    database: process.argv[5],
});

console.log(`Connecting to ${process.argv[2]}...`);
client.connect()
    .then(() => {
        console.log('Connected successfully');
        return client.query('SELECT NOW()');
    })
    .then(res => {
        console.log('Query result:', res.rows[0]);
        process.exit(0);
    })
    .catch(err => {
        console.error('Connection error:', err.stack);
        process.exit(1);
    });
