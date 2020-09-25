import React from "react";
import "./TransactionStyle.css" 
import PropTypes from "prop-types";
import {Button, Alert} from "react-native";
import authenticationHandle from "../FaceTouchID/WebAuthn";
import CitiLogo from '../citi_logo.png'

const styles = {
    image: {
        width: null,
        resizeMode: 'contain',
        height: 80
    }
}

function Transaction(props) {

    const handleAuthentication = (evt) => {
        evt.preventDefault();
        authenticationHandle(evt);
        alert(`Authenticating...`)
    }

    return (
        <div className = "transaction">
            <img src={CitiLogo} alt="Logo" style={styles.image}/>;
            <h1>Authorisation Page</h1>
            <p>Merchant: {props.merchant}</p>
            <p>Amount: {props.amount}</p>
            <p>Date: {props.date}</p>
            <p>Card Number: {props.card_number}</p>
            <p>Transaction ID: {props.transaction_id}</p>
            <button onClick={handleAuthentication}>Authenticate with FaceID/TouchID</button>
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