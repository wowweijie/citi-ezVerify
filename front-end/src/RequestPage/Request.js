import React from 'react';
import "./RequestStyle.css"

var state = {
  data: null
};

var querystring = require('querystring')

function Request() {
  const [payee, setPayee] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [cardNumber, setCardNumber] = React.useState("");
  const number = "+6582668696";

  


  const handleSubmit = (event) => {
    console.log(`
      Payee: ${payee}
      Amount: ${amount}
      Card Number: ${cardNumber}
    `);

    event.preventDefault();
  }

  const postTransaction = () => {
    // POST request using fetch() 
    fetch('/transactions/add_transaction', { 
          
      // Adding method type 
      method: "POST", 
        
      // Adding body or contents to send 
      body: JSON.stringify({ 
          payee: payee, 
          amount: amount, 
          card_number: cardNumber 
      }),
      // Adding headers to the request 
      headers: { 
        "Content-type": "application/json; charset=UTF-8"
      }    
    }) 
    // Converting to JSON 
    .then(response => response.json()) 
    .then(response => {
      let transaction_id = response.data;
      let url = "http://localhost:3000/auth/"+transaction_id;
      console.log(url)
      sendSMS(url,number);
  }); 

  }

  const sendSMS = (url,number) => {
    // POST request using fetch() 
    fetch('/sms_otp/messages', { 
          
      // Adding method type 
      method: "POST", 
        
      // Adding body or contents to send 
      body: JSON.stringify({ 
          to: number,
          body: url 
      }),
      // Adding headers to the request 
      headers: { 
        "Content-type": "application/json"
      }    
    }) 
    // Converting to JSON 
    .then(response => response.json()) 
    .then(data => {
      if (data.success) {
        this.setState({
          error: false,
          submitting: false,
          message: {
            to: '',
            body: ''
          }
        });
      } else {
        this.setState({
          error: true,
          submitting: false
        });
      }
    });


  }
 
  
  // const axios = require('axios')
  // async function sendSMS(authUrl,phoneNumber) {
  //   console.log("authUrl", authUrl);
  //   console.log("phoneNumber", phoneNumber);
  //   // const config = {
  //   //     'Content-Type': 'application/x-www-form-urlencoded'
  //   // }
  //   // const requestBody = {
  //   //   Body: authUrl,
  //   //   To: phoneNumber,
  //   //   From: '+14439513301'
  //   // }
  //   // const url = 'https://AC4f84bd7bad460e74b645fed353c1b845:26aa330f9bed147f0213c89d8e5aea28@api.twilio.com/2010-04-01/Accounts/AC4f84bd7bad460e74b645fed353c1b845/Messages'
  //   // console.log("qs :", querystring.stringify(requestBody))
  //   // axios({method: 'post', url:url, data:querystring.stringify(requestBody), headers:config })
  //   //   .then(res => {
  //   //     console.log(`statusCode: ${res.statusCode}`)
  //   //     console.log(res)
  //   //   })
  //   //   .catch(error => {
  //   //     console.error(error)
  //   //   })

  //   // Twilio Credentials
  //   const accountSid = 'AC4f84bd7bad460e74b645fed353c1b845';
  //   const authToken = '26aa330f9bed147f0213c89d8e5aea28';

  //   // require the Twilio module and create a REST client
  //   const client = require('twilio')(accountSid, authToken);

  //   client.messages
  //     .create({
  //       to: phoneNumber,
  //       from: '+14439513301',
  //       body: authUrl,
  //     })
  // }


  return (
    <form onSubmit={handleSubmit}>
      <h1>Payment Request</h1>

      <label>
        Payee:
        <input
          name="payee"
          type="payee"
          value={payee}
          onChange={e => setPayee(e.target.value)}
          required />
      </label>

      <label>
        Amount ($):
        <input
          name="amount"
          type="amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          required />
      </label>

      <label>
        Card Number:
        <input
          name="cardNumber"
          type="cardNumber"
          value={cardNumber}
          onChange={e => setCardNumber(e.target.value)}
          required />
      </label>

      <button onClick={postTransaction}>Pay</button>
    </form>
  );
}

  export default Request