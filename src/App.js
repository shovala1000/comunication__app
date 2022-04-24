import {
    Routes,
    Route,
} from "react-router-dom";
import SignManagement from "./SignManagement/SignManagement";
import ChatScreen from "./ChatPage/screen/ChatScreen";

import React, {useState} from "react";
import initialState, {contactMap} from "./userData/data";

// export const username = [];
export default function App() {
    initialState();

    //function for every contact create path

        var p =[];
        // for(let i=0; i<contactMap.size;i++){
        contactMap.forEach((value, key) => {
            p.push((<Route path={"chat/" + key} element={<ChatScreen mainContact={contactMap.get(key)} connectedUser={key}/>}/>));
        })



    return (
        <Routes >
            <Route path="/" element={<SignManagement/>}/>
            {p}
        </Routes>
    );
}