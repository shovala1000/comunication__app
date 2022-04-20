import React, {useState} from "react";
import {Button} from "react-bootstrap";
import {Contact, ContactChatInfo, contactMap} from '../userData/data';
import './SignInOrUp.css';
import {Link, useNavigate} from "react-router-dom";


function SignUp({setShow1, setShow2, show1, show2}) {
    let navigate = useNavigate();
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

        // Find user login info
        const userData = contactMap.get(username);

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
            } else if (!isImageValid(image)) {
                setErrorMessages({name: "img", message: errors.img});
            } else {
                console.log(" Add new register to database");
                // Add new register to database
                const contact = new Contact(username,password,image,'profile',nickname);
                const contactChatInfo= new ContactChatInfo(contact,[]);
                contactMap.set(username,contactChatInfo);
                // database += new Register(username, nickname, password);
                console.log(contactMap);
                //sign up successfully
                setIsSubmitted(true);
            }
        }
    };


    // Generate code for error message
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (<div className="error">{errorMessages.message}</div>);

    const renderForm = (
        <form className="form" onSubmit={handleSubmit}>
            <div className="title">Sign Up</div>
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
            <div id = "button-container">
                <Button id="button-container" onClick={handleSubmit} type="submit">
                Submit
            </Button>
            </div>
            <div id='details'>
                already a register?
                <Link to={'/'}
                      onClick={() => {
                          setShow1(!show1);
                          setShow2(!show2);
                      }}>
                    Sign In
                </Link>
            </div>
        </form>);
    return (
        <div className="sign-info-background">
            {isSubmitted ? navigate('chat/' + username, {replace: true}) : renderForm}
        </div>
    );
}

export default SignUp;