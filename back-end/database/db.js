const dbConfig = require("./db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.db, dbConfig.user, dbConfig.password, {
    server: dbConfig.server,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {}

db.sequelize = sequelize
db.Sequelize = Sequelize

db.transactions = require("../models/Transactions.js")(sequelize,Sequelize);

module.exports = db;