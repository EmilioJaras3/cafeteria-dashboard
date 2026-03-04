SELECT datname, pg_catalog.pg_get_userbyid(datdba) AS owner FROM pg_database WHERE datname = 'tienditacampus';
\c tienditacampus
SELECT nspname, pg_catalog.pg_get_userbyid(nspowner) AS owner FROM pg_namespace WHERE nspname = 'public';
