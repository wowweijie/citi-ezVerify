module.exports = (sequelize, Sequelize) => {
    const Transactions = sequelize.define("transactions", {
        transaction_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        payee:{
            type: Sequelize.STRING,
            allowNull: false
        },
        amount: {
            type:Sequelize.FLOAT,
            allowNull: false
        },
        date: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        card_number: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        username: {
            type: Sequelize.STRING,
            allowNull: true
        },
        status:{
            type: Sequelize.BOOLEAN
        }
    },
    {
        timestamps: false,
        underscored: true,
        underscoredAll: true,
    
    })

    return Transactions

}