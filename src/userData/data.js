import {HubConnectionBuilder, LogLevel} from '@microsoft/signalr';
import {useState} from "react";
//info of specific user
export const context =
    {
        contactId: '',
        connection: '',
        token: '',
        server: 'https://localhost:7049/api/',
        Ratings:'https://localhost:5219/Ratings',
        messages: [],
        currentMessage: {},
        listConatcts: []
    };


// export const startConnection = async (userId) => {
//     //post a message to contact (id) with content
//     const receiveMessage = async (content, userId, contactId) => {
//         await fetch(context.server + 'Contacts/' + contactId + '/Messages', {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': 'Bearer ' + context.token,
//             }
//         })
//             .then(response => response.json())
//             .then(data => {
//                 context.messages = data;
//             });
//     }
//     try {
//         const connection = new HubConnectionBuilder()
//             .withUrl('https://localhost:7049/AppHub')
//             .build();
//         await connection.start().then(result => {
//             connection.invoke("LogIn", userId);
//             console.log("result: ", result);
//             connection.on('ReceiveMessage', message => {
//                 console.log(message);
//                 receiveMessage(message.content, userId, context.contactId)
//                 //postMessage(message.UserId, message.Contact);
//             })
//         });
//
//         context.connection = connection;
//     } catch (e) {
//         console.log(e);
//     }
// }


// const sendMessage = async ( content, userId, contactId) => {
//     try {
//         console.log("Content: ", content, "ContactId: ", contactId, "UserId: ", userId);
//         await context.connection.invoke("SendMessage", content, userId, contactId);
//     } catch (e) {
//         console.log(e);
//     }
// }
//get messages with contact (id)