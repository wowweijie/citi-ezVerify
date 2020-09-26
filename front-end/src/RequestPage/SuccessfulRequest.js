import React from "react";
import "../App.css" 
import SmartphonePic from '../smartphone.png'

const styles = {
    image: {
        width: 150,
        height: 150,
        resizeMode: 'contain'
    }
}

function SuccessfulRequest(props) {

    return (
        <div className = "transaction">
            <h1>Payment Request Successful</h1>
            <p>ezVerify link has been sent to your mobile number. Click on it to authenticate payment through FaceID/TouchID.</p>
            <img src={SmartphonePic} alt="Logo" style={styles.image}/>;
        </div>
    )
}


export default SuccessfulRequest;