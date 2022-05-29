import React, {useEffect, useState} from "react";
import {Button} from "react-bootstrap";
// import {contactMap} from '../userData/data';
import './SignInOrUp.css';
import {Link, Route, Router} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import ChatScreen from "../ChatPage/screen/ChatScreen";
import {addContact, AddUserToConnection, context, startConnection} from "../userData/data";
import {HubConnectionBuilder} from "@microsoft/signalr";

function SignIn({setRouteArray, setShow1, setShow2, show1, show2}) {
    let navigate = useNavigate();
    // States for registration
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    // States for user
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    //Error message
    const error = "invalid username or/and password";


    /**************************************************************************************************************** */
        // //signalR
        // const [connection, setConnection] = useState();
        // const startConnection = async () => {
        //     try {
        //         const connection = new HubConnectionBuilder()
        //             .withUrl('https://localhost:7049/AppHub')
        //             .build();
        //         await connection.start().then((result)=>{
        //             connection.on('ReceiveMessage',message=>{
        //
        //             })
        //         });
        //         setConnection(connection);
        //     } catch (e) {
        //         console.log(e);
        //     }
        // }

    // user signIn
    async function postUser(id, password) {
        await fetch(context.server + 'Login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: id, password: password})
        })
            .then(response => {
                response.text().then((r) => context.token = r);
                isValid(response.status);
            })
    }

    // check that the user signIn successfully
    function isValid(status) {
        // if user exist
        if (status === 200) {
            //sign in successfully
            setIsSubmitted(true);
        }
        // Username not found
        else {
            setErrorMessages({message: error});
        }
    }


    /**************************************************************************************************************** */


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
        //ask from server to signIn
        postUser(username, password);
        startConnection(username);
    };

    // Generate JSX code for error message
    const renderErrorMessage = () =>
        (<div className="error">{errorMessages.message}</div>);

    function navToNewRoute() {
        setRouteArray(prev => [...prev, (
            <Route key={username} path={"chat/" + username} element={<ChatScreen username={username}/>}/>)]);
        navigate('chat/' + username, {replace: true});
    }

    // Send the user to the ratings page.
    function goToRatings() {
        setRouteArray(prev =>  [...prev, (<Route key={username} path={"chat/" + username} element={<ChatScreen username={username}/>}/>)]);
       window.location.href= context.Ratings;
    }

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
                <div className='button-container'>
                    <Button id="button-container-signIn" onClick={handleSubmit} type="submit">
                        Submit
                    </Button>
                </div>
                <div className='button-container'>
                    <Button id="button-container-Ratings" onClick={goToRatings}>
                        Go to ratings
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
            {isSubmitted ? navToNewRoute() : renderForm}
        </div>
    );
}

export default SignIn;