import React, {useState} from "react";
import {Button} from "react-bootstrap";
import {contactMap} from '../userData/data';
import './SignInOrUp.css';
import {Link} from "react-router-dom";
import { Navigate } from "react-router-dom";

function SignIn({setShow1, setShow2, show1, show2}){
    // States for registration
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    // States for user
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    //Error message
    const error = "invalid username or/and password";
// Handling the username change
    const handleUsername = (e) => {
        setUsername(e.target.value);
        setIsSubmitted(false);
    };
    // Handling the password change
    const handlePassword = (e) => {
        setPassword(e.target.value);
        setIsSubmitted(false);
    };

    const handleSubmit = (event) => {
        //Prevent page reload
        event.preventDefault();

        // Find user login info
        const userData = contactMap.get(username);

        // Compare user info
        if (userData) {
            if (userData.mainContact.password !== password) {
                // Invalid password
                setErrorMessages({message: error});
            }
            //sign in successfully
            else {
                setIsSubmitted(true);
            }
        }
        // Username not found
        else {
            setErrorMessages({message: error});
        }
    };


    // Generate JSX code for error message
    const renderErrorMessage = () =>
        (<div className="error">{errorMessages.message}</div>);

    // sign in form
    const renderForm = (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="title">Sign In</div>
                <div>  {renderErrorMessage()}</div>
                <div className="input-container">
                    <label>Username </label>
                    <input type="text" name="uname" onChange={handleUsername} className="input"
                           value={username} required/>
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input type="password" name="pass" onChange={handlePassword} className="input"
                           value={password} required/>
                </div>
                <div id='button-container'>
                    <Button id="button-container" onClick={handleSubmit} type="submit">
                        Submit
                    </Button>
                </div>
                <div id='details'>
                    not register yet?
                    <Link to={'/'}
                          onClick={() => {
                              setShow1(!show1);
                              setShow2(!show2);
                          }}>
                    Sign Up
                    </Link>
                </div>
            </form>
        </div>
    );

    return (
        <div className="sign-info-background">
            {isSubmitted ? <Navigate to ={'chat/' + username}/>: renderForm}
        </div>
    );
}

export default SignIn;