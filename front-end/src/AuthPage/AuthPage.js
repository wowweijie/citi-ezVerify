import React from "react";
import '../App.css';
import Transaction from "./Transaction";



function AuthPage(props){
    return (
        <div className = "request">
            <Transaction merchant = "Citibank"
                         amount = "$100"
                         date = "25/9/2020"
                         card_number = "XXXX XXXX XXXX 1234"
                         transaction_id = {props.match.params.id}/>
        </div>
      )
}

export default AuthPage