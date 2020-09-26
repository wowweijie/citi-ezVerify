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
            let {payee, amount, date, card_number, ...rest} = {payee:"WONG XIAOQING", amount:"250", date : "2020-09-23T13:50:05Z",card_number:"40061238" };
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
                         payee = {payee}
                         date = {date.slice(0,10)+" "+date.slice(11,22)}
                         card_number = {cardNumber}
                         transaction_id = {props.match.params.id}/>
        </div>
      )
}

export default AuthPage