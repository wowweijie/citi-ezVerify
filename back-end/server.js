const express       = require('express');
const bodyParser    = require('body-parser');
const cookieSession = require('cookie-session');
const cookieParser  = require('cookie-parser');
const urllib        = require('url');
const path          = require('path');
const crypto        = require('crypto');

const config        = require('./config.json');
const defaultroutes = require('./routes/default');
const passwordauth  = require('./routes/password');
const webuathnauth  = require('./routes/webauthn.js');
const pino = require('express-pino-logger')();


const TWILIO_ACCOUNT_SID='AC4f84bd7bad460e74b645fed353c1b845';
const TWILIO_AUTH_TOKEN='26aa330f9bed147f0213c89d8e5aea28';
const TWILIO_PHONE_NUMBER='+14439513301';

process.env['TWILIO_ACCOUNT_SID'] = TWILIO_ACCOUNT_SID;
process.env['TWILIO_AUTH_TOKEN'] = TWILIO_AUTH_TOKEN;
process.env['TWILIO_PHONE_NUMBER'] = TWILIO_PHONE_NUMBER;

const app           = express();
const db = require('./database/db');

var Transactions = require('./routes/transactions');
var SmsOTP = require('./routes/sms_otp');

app.use(bodyParser.json());

/* ----- session ----- */
app.use(cookieSession({
  name: 'session',
  keys: [crypto.randomBytes(32).toString('hex')],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))
app.use(cookieParser())

/* ----- serve static ----- */
app.use(express.static(path.join(__dirname, 'static')));

app.use('/', defaultroutes)
app.use('/password', passwordauth)
app.use('/webauthn', webuathnauth)
app.use('/transactions', Transactions)
app.use('/sms_otp', SmsOTP)

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);



db.sequelize.sync();

const port = process.env.PORT || config.port ;

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;

