const express = require('express')
const sms = express.Router()
const cors = require('cors')

const db = require("../database/db");

sms.use(cors())

const Sequelize = require('sequelize');
const op = Sequelize.Op;

sms.post('/sms_otp/messages', (req, res) => {
  res.header('Content-Type', 'application/json');
  client.messages
    .create({
      from: process.env.TWILIO_PHONE_NUMBER,
      to: req.body.to,
      body: req.body.body
    })
    .then(() => {
      res.send(JSON.stringify({ success: true }));
    })
    .catch(err => {
      console.log(err);
      res.send(JSON.stringify({ success: false }));
    });
});


module.exports = sms