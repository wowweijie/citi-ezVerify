let dbInUse = "ezverify_db"

module.exports = {
    connectionLimit : 100,
    host: "localhost",
    user: "root",
    password: "happyhappy122",
    db: dbInUse,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
};
