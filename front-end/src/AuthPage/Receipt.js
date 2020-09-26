import React from "react";
import "./TransactionStyle.css" 



function Receipt(props) {
  return (
    <div className="transaction">
      <h1>Success </h1>
      <p>
        Your transaction is successful! These are the details of your
        transaction:</p>
      <p>Amount: {props.amount} </p>
      <p>Merchant: {props.merchant} </p>
      <p>Date: {props.date} </p>
      <p>Card number: {props.card_number}</p>
      <p>ID: {props.transaction_id}</p>
    </div>
  );
}

export default Receipt;