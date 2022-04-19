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
            console.log(contactMap.get(key));
            p.push((<Route path={"chat/" + key} element={<ChatScreen contactChatInfo={contactMap.get(key)}/>}/>));
        })
        console.log(p);



    return (
        <Routes >
            <Route path="/" element={<SignManagement/>}/>
            {p}
        </Routes>
    );
}