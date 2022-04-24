import {
    Routes,
    Route, BrowserRouter,
} from "react-router-dom";
import SignManagement from "./SignManagement/SignManagement";
import ChatScreen from "./ChatPage/screen/ChatScreen";

import React, {useState} from "react";
import initialState, {contactMap} from "./userData/data";


export default function App() {
    const [isAddRoute, setAddRoute] = useState(false);
    const [RouteArray, setRouteArray] = useState([]);
    //function for every contact create path
    contactMap.forEach((value, key) => {
        RouteArray.push((<Route path={"chat/" + key} element={<ChatScreen mainUserName={key}/>}/>));
    })
   return(
        <Routes>
            <Route path="/" element={<SignManagement setRouteArray={setRouteArray}
                                                     setAddRoute={setAddRoute}/>}/>
            {RouteArray}
        </Routes>
    );
}