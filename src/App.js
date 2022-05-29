import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignManagement from "./SignManagement/SignManagement";
import React, {useState} from "react";
import {context} from "./userData/data";
import {HubConnectionBuilder} from "@microsoft/signalr";


const App = () => {
    const [RouteArray, setRouteArray] = useState([]);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignManagement setRouteArray={setRouteArray}/>}/>
                {RouteArray}
            </Routes>
        </BrowserRouter>
    );
}
export default App;