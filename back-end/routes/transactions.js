const express = require('express')
const transactions = express.Router()
const cors = require('cors')

const db = require("../database/db");
const Transactions  = db.transactions

transactions.use(cors())

const Sequelize = require('sequelize');
const op = Sequelize.Op;

transactions.post('/add_transaction',(req, res) => {
    const today = new Date()
    const transaction_data = {
        payee: req.body.payee,
        amount: req.body.amount,
        card_number: req.body.card_number,
        date: today
    }
    Transactions.create(transaction_data)
    .then(result => {
        res.json({status: 200, message: 'Transaction created'})
    })
    .catch(err => {
        //res.send('error' + err)
        res.json({status: 500, message: 'Transaction not done'})
    })
})


module.exports = transactions