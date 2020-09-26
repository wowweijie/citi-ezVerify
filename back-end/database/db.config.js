let dbInUse = "ezverify_db"

module.exports = {
    connectionLimit : 100,
    server: "DESKTOP-10I6R6B",
    user: "ezverify",
    password: "Happyhappy122!",
    db: dbInUse,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
};
