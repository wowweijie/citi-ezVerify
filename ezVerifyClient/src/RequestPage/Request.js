import React, { Component } from 'react';
import "./RequestStyle.css"
import { useHistory } from "react-router-dom";

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

      <button onClick={() => history.push('/auth') }>Pay</button>
    </form>
  );
}

  export default Request