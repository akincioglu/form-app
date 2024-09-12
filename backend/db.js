const sql = require("mssql");

const config = {
  server: "localhost",
  user: "sa",
  password: "Your_password123",
  database: "testdb",
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log("MSSQL connected");
    return pool;
  })
  .catch((err) => {
    console.log("MSSQL connection error:", err);
  });

module.exports = {
  sql,
  poolPromise,
};
