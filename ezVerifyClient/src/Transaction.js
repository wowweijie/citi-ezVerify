import React from "react";
import "./App.css" 
import PropTypes from "prop-types";
import {Button, Alert} from "react-native";
import authenticationHandle from "./WebAuthn";

function Transaction(props) {

    const handleAuthentication = (evt) => {
        evt.preventDefault();
        authenticationHandle(evt);
        alert(`Authenticating...`)
    }

    return (
        <div className = "transaction">
            <h2>Authorisation Page</h2>
            <p>Merchant: {props.merchant}</p>
            <p>Amount: {props.amount}</p>
            <p>Date: {props.date}</p>
            <p>Card Number: {props.card_number}</p>
            <p>Transaction ID: {props.transaction_id}</p>
            <Button
                title="Authenticate"
                onPress={handleAuthentication}
            />
        </div>
    )
}

Transaction.propTypes = {
    merchant: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    card_number: PropTypes.string.isRequired,
    transaction_id: PropTypes.string.isRequired
}

export default Transaction;