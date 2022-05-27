import {useEffect, useState} from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import './SignManagement.css';
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Info from "./Info";


function SignManagement({setRouteArray}) {

    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(true);

//     useEffect(() => {
//         // POST request using fetch inside useEffect React hook
//         const requestOptions = {
//             method: 'POST',
//             // body: JSON.stringify(transUpdate),
//             headers : {
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json'
//             }
//         };
//         async function fetchData() {
//             return await fetch('https://localhost:7049/api/Register?username=a&password=a', requestOptions)
//                 .then(response => response.json(),
//                     error => console.log("error occurred", error))
//                 .then(data => setList(data))
//         }
//         fetchData();
//
//
// // empty dependency array means this effect will only run once (like componentDidMount in classes)
//     }, []);
//     console.log(list);

    const display1 = () => {
        if (show1) return "none";
        return "flex";
    }
    const display2 = () => {
        if (show2) return "none";
        return "flex";
    }

    return (
        <Container className='main-container'>
            <Row style={{display: display1()}}>
                <Col id='info' className='slide-animation '>
                    <Info
                        signName={"Sign Up"}
                        setShow1={setShow1}
                        setShow2={setShow2}
                        show1={show1}
                        show2={show2}/>
                </Col>
                <Col className='slide-animation2'>
                    <SignIn setRouteArray={setRouteArray}
                            setShow1={setShow1}
                            setShow2={setShow2}
                            show1={show1}
                            show2={show2}/>
                </Col>
            </Row>
            <Row style={{display: display2()}}>
                <Col
                    className='slide-animation'
                > <SignUp setRouteArray={setRouteArray}
                          setShow1={setShow1}
                          setShow2={setShow2}
                          show1={show1}
                          show2={show2}/>

                </Col>
                <Col id='info' className='slide-animation2'>
                    <Info
                        signName={"Sign In"}
                        setShow1={setShow1}
                        setShow2={setShow2}
                        show1={show1}
                        show2={show2}/>
                </Col>
            </Row>
        </Container>
    );
}


export default SignManagement;