import postgres from 'postgres';

const psql_user = process.env.DB_USERNAME || 'dov';
const psql_password = process.env.DB_PASSWORD || "example";
const psql_host = process.env.DB_HOST || 'localhost';
const psql_port = parseInt(process.env.DB_PORT || "5432");
const psql_db = process.env.DB_DATABASE || 'postgres';

const sql = postgres({port: psql_port, host: psql_host, user: psql_user, password: psql_password, database: psql_db});

export default sql;