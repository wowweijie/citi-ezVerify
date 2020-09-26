import React, {useEffect} from "react";
import '../App.css';
import Transaction from "./Transaction";



function AuthPage(props){

    const [payee, setPayee] = React.useState("");
    const [amount, setAmount] = React.useState("");
    const [cardNumber, setCardNumber] = React.useState("");
    const [date, setDate] = React.useState("");

    const getTransaction = (id) => {
        //  GET request using fetch() 
        fetch("/transactions/get_transaction/"+id) 
            
        // Converting received data to JSON 
        .then(response => response.json())
        .then(response => {
            console.log(response.data)
            let {transaction_id, payee, amount, date, card_number,username,status} = response.data[0];
            setPayee(payee);
            setAmount(amount);
            setCardNumber(card_number);
            setDate(date);
        }); 
      }

    useEffect(() => getTransaction(props.match.params.id));

    return (
        <div className = "transaction">
            <Transaction merchant = {payee}
                         amount = {amount}
                         date = {date.slice(0,10)+" "+date.slice(11,22)}
                         card_number = {cardNumber}
                         transaction_id = {props.match.params.id}/>
        </div>
      )
}

export default AuthPage