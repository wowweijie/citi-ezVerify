import React from 'react';
import "./RequestStyle.css"
import { useHistory } from 'react-router-dom'


function Request() {
  const [payee, setPayee] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [cardNumber, setCardNumber] = React.useState("");
  const number = "+6582668696";
  const history = useHistory();
  


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
    fetch('/back-end/transactions/add_transaction', { 
          
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
      history.push('/requestsuccess')
  }); 

  }

  const sendSMS = (url,number) => {
    // POST request using fetch() 
    fetch('/back-end/sms_otp/messages', { 
          
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

  }


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