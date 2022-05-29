import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignManagement from "./SignManagement/SignManagement";
import React, {useState} from "react";
import {context} from "./userData/data";
import {HubConnectionBuilder} from "@microsoft/signalr";


const App = () => {
    const [RouteArray, setRouteArray] = useState([]);
    // const [connection, setConnection] = useState();
    // const startConnection = async () => {
    //     try {
    //         const connection = new HubConnectionBuilder()
    //             .withUrl('https://localhost:7049/AppHub')
    //             .build();
    //         await connection.start();
    //         // await connection.invoke("AddUserToConnection", {"Id":userId,"Paddsword":password});
    //         setConnection(connection);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

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