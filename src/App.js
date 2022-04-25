import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignManagement from "./SignManagement/SignManagement";
import ChatScreen from "./ChatPage/screen/ChatScreen";
import React, {useState} from "react";
import {contactMap} from "./userData/data";


export default function App() {
    // const [routeName, setAddRoute] = useState(false);


    const [isAddRoute, setAddRoute] = useState(false);
    const [RouteArray, setRouteArray] = useState([]);
    //function for every contact create path
    contactMap.forEach((value, key) => {
        RouteArray.push((<Route key={key} path={"chat/" + key} element={<ChatScreen mainUserName={key}/>}/>));
    })
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignManagement setRouteArray={setRouteArray}
                                                         setAddRoute={setAddRoute}/>}/>
                {RouteArray}
            </Routes>
        </BrowserRouter>
    );
}