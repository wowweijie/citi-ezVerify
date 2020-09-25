import React from 'react';
import "./RequestStyle.css"
import { useHistory } from "react-router-dom";

var state = {
  data: null
};

function Request() {
  const [payee, setPayee] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [cardNumber, setCardNumber] = React.useState("");

  const history = useHistory();

  const handleSubmit = (event) => {
    console.log(`
      Payee: ${payee}
      Amount: ${amount}
      Card Number: ${cardNumber}
    `);

    event.preventDefault();
  }

  const addTransaction = () => {
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
    var callBackendAPI = async () => {
    const response = await fetch('/transactions/add_transaction');
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;}
    
    callBackendAPI()
    .then(res => {this.payee({ data: res.payee });
                  this.amount({data: res.amount});
                  this.cardNumber({data: res.cardNumber}); })
    .catch(err => console.log(err));
    history.push('/auth')
  };

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
    // Displaying results to console 
    .then(json => console.log(json)); 

    

    history.push('/auth');
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