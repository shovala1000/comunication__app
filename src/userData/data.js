import {HubConnectionBuilder, LogLevel} from '@microsoft/signalr';
import {useState} from "react";
//info of specific user
export const context =
    {
        connection: '',
        token: '',
        server: 'https://localhost:7049/api/',
        Ratings: 'http://localhost:5219/Ratings',
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
        context.connection = connection;
    } catch (e) {
        console.log(e);
    }
}