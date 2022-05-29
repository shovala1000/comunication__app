import {HubConnectionBuilder, LogLevel} from '@microsoft/signalr';
import {useState} from "react";
//info of specific user
export const context =
    {
        connection: '',
        token: '',
        server: 'https://localhost:7049/api/',
        messages: [],
        currentMessage: {}
    };
export const startConnection = async (userid) => {
    try {
        const connection = new HubConnectionBuilder()
            .withUrl('https://localhost:7049/AppHub')
            .build();
        await connection.start().then(result => {
            connection.invoke("LogIn", userid);
            console.log("result: ",result);
            connection.on('ReceiveMessage', message => {
                console.log(message);
                //postMessage(message.UserId, message.Contact);
            })
        });

<<<<<<< HEAD
export const AddUserToConnection = async (userId) => {
    try {
        const connection = new HubConnectionBuilder()
            .withUrl('https://localhost:7049/AppHub')
            .build();
        await connection.start();
        await connection.invoke("AddUserToConnection", userId);
        //setConnection(connection);
=======
        context.connection = connection;
>>>>>>> a796f7368d5119f094da47f5149ede5c56353687
    } catch (e) {
        console.log(e);
    }
}