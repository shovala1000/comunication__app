import React from "react";
import {Button} from "react-bootstrap";
import "./SignInfo.css"


function Info({signName, setShow1, setShow2, show1, show2}) {
    function InfoSign(name, title, details) {
        this.name = name;
        this.title = title;
        this.details = details;
    }
    const info = new InfoSign();
    if (signName === "Sign Up") {
        info.name = "Sign Up";
        info.title = "Hello, Friend!";
        info.details = <div className='details'> Enter your personal details <br/> and start your journey with us</div>
    } else if (signName === "Sign In") {
        info.name = "Sign In";
        info.title = "Welcome Back!";
        info.details =
            <div className='details'> To stay connected please <br/> login with your personal info</div>
    }
    return (
        <div className="sign-info-background" style={{display:'flex'}}>
            <div className="title">{info.title}</div>
            {info.details}
            <div>
                <Button
                    id="button-container"
                onClick={() => {
                    setShow1(!show1);
                    setShow2(!show2);
                }}
            >
                {info.name}
            </Button> </div>

        </div>

    );
}

export default Info;