import React, {useState} from "react";
import console from "console";
import {Button} from "react-bootstrap";
import './SignInOrUp.css';
function SignUp({database, Register}) {
    // States for checking the errors
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    // States for registration
    const [username, setUsername] = useState('');
    const [nickname, setNickname] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState('');
//Error messages
    const errors = {
        uname: "Username already exist",
        name: "letters and numbers only",
        pass: "letters and numbers only (minimum 1 from each)",
        copass: "password mismatch",
        img: "select valid image"
    };

// Handling the username change
    const handleUsername = (e) => {
        setUsername(e.target.value);
        setIsSubmitted(false);
    };

// Handling the nickname change
    const handleNickname = (e) => {
        setNickname(e.target.value);
        setIsSubmitted(false);
    };

    // Handling the password change
    const handlePassword = (e) => {
        setPassword(e.target.value);
        setIsSubmitted(false);
    };
// Handling the confirm password change
    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
        setIsSubmitted(false);
    };
// Handling the image change
    const handleImage = (e) => {
        setImage(e.target.value);
        setIsSubmitted(false);
    };
    const isPassValid = (pass) => {
        let value = pass.toString();
        let isNum = false, isLetter = false;
        if (value.length > 1) {
            for (let i = 0; i < value.length; i++) {
                if (('a' <= value.at(i) && value.at(i) <= 'z') ||
                    ('A' <= value.at(i) && value.at(i) <= 'Z')) {
                    isLetter = true;
                } else if (('0' <= value.at(i) && value.at(i) <= '9')) {
                    isNum = true;
                } else return false;
            }
        } else return false;
        return isNum && isLetter;
    };
    const isNameValid = (name) => {
        let value = name.toString();
        if (value.length >= 1) {
            for (let i = 0; i < value.length; i++) {
                if (!(('a' <= value.at(i) && value.at(i) <= 'z') ||
                    ('A' <= value.at(i) && value.at(i) <= 'Z') ||
                    ('0' <= value.at(i) && value.at(i) <= '9'))) {
                    return false;
                }
            }
            return true;
        }
        return false;
    };
    const isImageValid = (img) => {
        let value = img.toString();
        return value.match(/\.(jpg|jpeg|png|gif)$/);
    }


    const handleSubmit = (event) => {
        //Prevent page reload
        event.preventDefault();

        // var {uname, nname, pass, copass} = document.forms[0];

        // Find user login info
        const userData = database.find((user) => user.username === username);

        // Username already exist
        if (userData) {
            setErrorMessages({name: "uname", message: errors.uname});
        }
        // Username not found
        else {
            // Invalid username
            if (!isNameValid(username)) {
                setErrorMessages({name: "uname", message: errors.name});

            }
            // Invalid nickname
            else if (!isNameValid(nickname)) {
                setErrorMessages({name: "nname", message: errors.name});
            }
            // Invalid password
            else if (!isPassValid(password)) {
                setErrorMessages({name: "pass", message: errors.pass});
            }
            // Invalid confirm password
            else if (password !== confirmPassword) {
                setErrorMessages({name: "copass", message: errors.copass});
            }else if(!isImageValid(image)){
                setErrorMessages({name: "img", message: errors.img});
            }
            else {
                console.log(" Add new register to database");
                // Add new register to database
                database += new Register(username, nickname, password);

                //sign up successfully
                setIsSubmitted(true);
            }
        }
    };


    // Generate JSX code for error message
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (<div className="error">{errorMessages.message}</div>);
    const renderForm = (
        <form className="form" onSubmit={handleSubmit}>
            <div className="input-container">
                <label>Username </label>
                <input type="text" name="uname" onChange={handleUsername} className="input"
                       value={username} required/>
                <div>  {renderErrorMessage("uname")}</div>
            </div>
            <div className="input-container">
                <label>Nickname </label>
                <input type="text" name="nname" onChange={handleNickname} className="input"
                       value={nickname} required/>
                <div>  {renderErrorMessage("nname")}</div>
            </div>
            <div className="input-container">
                <label>Password </label>
                <input type="password" name="pass" onChange={handlePassword} className="input"
                       value={password} required/>
                <div>  {renderErrorMessage("pass")}</div>
            </div>
            <div className="input-container">
                <label>Confirm Password </label>
                <input type="password" name="copass" onChange={handleConfirmPassword} className="input"
                       value={confirmPassword} required/>
                <div>  {renderErrorMessage("copass")}</div>
            </div>
            <div className="input-container">
                <label>Image </label>
                <input type="file" name="img" onChange={handleImage} className="input"
                       value={image} required/>
                <div>  {renderErrorMessage("img")}</div>
            </div>
            <div id='button-container'>
                <Button id="button-container" onClick={handleSubmit} type="submit">
                    Submit
                </Button>
            </div>
        </form>);
    return (
        <div className="sign-info-background">
            <div className="title">Sign Up</div>
            {isSubmitted ? <div>User is successfully sign up</div> : renderForm}
        </div>
    );
}

export default SignUp;