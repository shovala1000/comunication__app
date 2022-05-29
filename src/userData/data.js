import {HubConnectionBuilder, LogLevel} from '@microsoft/signalr';
import {useState} from "react";
//info of specific user
export const context =
    {
        token: '',
        server: 'https://localhost:7049/api/',
        messages: [],
        currentMessage: {}
    };
export const addContact = async (contact) => {
    try {
        const connection = new HubConnectionBuilder()
            .withUrl('https://localhost:7049/AppHub')
            .configureLogging(LogLevel.Information)
            .build();
        connection.on("AddUserToConnection", (contact) => {
            console.log('ContactAdded: ', contact);
        });
        await connection.start();
        await connection.invoke("AddUserToConnection", {contact});
        //setConnection(connection);
    } catch (e) {
        console.log(e);
    }
}

export const AddUserToConnection = async (userId) => {
    try {
        const connection = new HubConnectionBuilder()
            .withUrl('https://localhost:7049/AppHub')
            .build();
        await connection.start();
        await connection.invoke("AddUserToConnection", userId);
        //setConnection(connection);
    } catch (e) {
        console.log(e);
    }
}