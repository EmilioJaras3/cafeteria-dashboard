SELECT 'CREATE DATABASE tienditacampus' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'tienditacampus')\gexec
