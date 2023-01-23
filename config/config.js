require("dotenv").config();

const { DB_USERNAME, DB_PASS, DB_HOST, DATABASE } = process.env;
const { PRO_DB_USERNAME, PRO_DB_PASS, PRO_DB_HOST, PRO_PORT, PRO_DATABASE } = process.env;

module.exports = {
  development: {
    user: DB_USERNAME,
    password: DB_PASS,
    host: DB_HOST,
    database: DATABASE,
    multipleStatements: true,
  },
  production: {
    database: PRO_DATABASE,
    user: PRO_DB_USERNAME,
    password: PRO_DB_PASS,
    host: PRO_DB_HOST,
    port: PRO_PORT,
    multipleStatements: true,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: {
      minVersion: "TLSv1.2",
      rejectUnauthorized: true,
    },
  },
};
