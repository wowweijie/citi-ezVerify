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

const app           = express();
const db = require('./database/db');

var Transactions = require('./routes/transactions');

// function handle_database(req,res) {

//   pool.getConnection(function(err,connection){
//       if (err) {
//         connection.release();
//         res.json({"code" : 100, "status" : "Error in connection database"});
//         return;
//       }   

//       console.log('connected as id ' + connection.threadId);

//       connection.query("select * from user",function(err,rows){
//           connection.release();
//           if(!err) {
//               res.json(rows);
//           }           
//       });

//       connection.on('error', function(err) {      
//             res.json({"code" : 100, "status" : "Error in connection database"});
//             return;     
//       });
// });
// }


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

db.sequelize.sync();

const port = process.env.PORT || config.port ;
// app.listen(port);
// console.log(`Started app on port ${port}`);

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;

// app.get("/",function(req,res){-
//   handle_database(req,res);
// });
