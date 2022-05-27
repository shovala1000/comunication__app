import {MESSAGES_TYPE} from "../ChatPage/chatHistory-List/Message";
import {useState} from "react";

export const Contact = function (userName, password, imageURL, nickname) {
    this.userName = userName;
    this.nickname = nickname;
    this.password = password;
    if (imageURL) {
        this.imageURL = imageURL;
    } else {
        this.imageURL = '/defalut-profile-picture.png';
    }
    this.imageAlt = 'avatar';
    this.type = null;
    // this.latestMessage = "";
    // this.latestMessageTime = "";
    this.messages = new Map();
    this.isActive = false;
}
export const MessageData = function (contact, latestMessage = "", latestMessageTime = "") {
    this.contact = contact;
    this.latestMessage = latestMessage;
    this.latestMessageTime = latestMessageTime;
}

export const ContactChatInfo = function (mainContact, contactList) {
    this.mainContact = mainContact;
    this.contactList = contactList;
    if (contactList.length !== 0) {
        contactList[0].isActive = true;
    }
}
export const Message = function (time, data, isMyMessage, type) {
    this.time = time;
    this.data = data;
    this.isMyMessage = isMyMessage;
    this.type = type;
}

// This map contain all the users in the app
export const contactMap = new Map();

// This function will create the Hard codded messages between the users.
function initialState() {
    const c1 = new Contact(
        'a1',
        'a1',
        null,
        'aa',
    );


    const c2 = new Contact(
        'b2',
        'b2',
        '/avatar2.png',
        'bb',
    );

    const c3 = new Contact(
        'c3',
        'c3',
        '/avatar3.png',
        'cc',
    );

    const c4 = new Contact(
        'd4',
        'd4',
        '/avatar4.png',
        'dd',
    );

    const c5 = new Contact(
        'e5',
        'e5',
        '/avatar5.png',
        'ee',
    );

    const c6 = new Contact(
        'f6',
        'f6',
        '/avatar6.png',
        'ff',
    );

    const c7 = new Contact(
        'g7',
        'g7',
        '/avatar7.png',
        'gg',
    );


    function sendMessageTo(from, to, message) {
        from.messages.set(to.userName, message);
        let newMessage = [];
        for (let i = 0; i < message.length; i++) {
            if (message[i].isMyMessage) {
                newMessage.push(new Message(message[i].time, message[i].data, false, message[i].type));
            } else {
                newMessage.push(new Message(message[i].time, message[i].data, true, message[i].type));
            }
        }
        to.messages.set(from.userName, newMessage);
    }

    //initialize messages between he contacts
    sendMessageTo(c1, c2, [new Message('9:50, 16/4/2022', 'Hi, how are you?', true, MESSAGES_TYPE.TEXT)]);
    sendMessageTo(c1, c3, [
        new Message('9:53, 16/4/2022', ' Hi, how are you? How is the project coming along?', true, MESSAGES_TYPE.TEXT),
        new Message('10:00, 16/4/2022', 'I am good, how are you?', false, MESSAGES_TYPE.TEXT),
        new Message('10:02, 16/4/2022', 'Do you want to meet and work on the project together?', false, MESSAGES_TYPE.TEXT),
        new Message('10:20, 16/4/2022', 'NO!', true, MESSAGES_TYPE.TEXT)]);
    sendMessageTo(c1, c4, []);
    sendMessageTo(c1, c5, [
        new Message('15:01, 20/4/2022', 'hi! what do you think, should i put this image as my profile?', true, MESSAGES_TYPE.TEXT),
        new Message('15:02, 20/4/2022', '/avatar1.png', true, MESSAGES_TYPE.IMAGE)]);
    sendMessageTo(c1, c6, [
        new Message('18:52, 22/4/2022', 'do you recognize this song?', false, MESSAGES_TYPE.TEXT),
        new Message('18:53, 22/4/2022', '/5244d621-8551-492c-a223-fa035702f2e5.weba', false, MESSAGES_TYPE.MICROPHONE)]);
    sendMessageTo(c1, c7, [
        new Message('17:57, 16/4/2022','you wont believe the view I am seeing right now!!!',false,MESSAGES_TYPE.TEXT),
        new Message('18:03, 16/4/2022','really!? send me a video',true,MESSAGES_TYPE.TEXT),
        new Message('18:04, 16/4/2022','/3135074881.mp4',false,MESSAGES_TYPE.VIDEO),
        new Message('18:04, 16/4/2022','omg! The sky is stunning!',true,MESSAGES_TYPE.TEXT),

    ])
    sendMessageTo(c2, c3, []);


    //initialize last message and time
    const c1Toc2 = new MessageData(c2, 'Hi, how are you?', '9:50, 16/4/2022');
    const c1Toc3 = new MessageData(c3, 'NO!', '10:20, 16/4/2022');
    const c1Toc4 = new MessageData(c4, '', '');
    const c1Toc5 = new MessageData(c5, 'Img', '15:02, 20/4/2022');
    const c1Toc6 = new MessageData(c6, 'Audio', '18:53, 22/4/2022');
    const c1Toc7 = new MessageData(c7, 'omg! The sky is stunning!', '18:04, 16/4/2022');


    const c2Toc1 = new MessageData(c1, 'Hi, how are you?', '9:50, 16/4/2022');
    const c2Toc3 = new MessageData(c3, '', '');
    const c3Toc1 = new MessageData(c1, 'NO!', '10:20, 16/4/2022');
    const c3Toc2 = new MessageData(c2, '', '');
    const c4Toc1 = new MessageData(c1, '', '');

    const c5Toc1 = new MessageData(c1, 'Img', '15:02, 20/4/2022');
    const c6Toc1 = new MessageData(c1, 'Audio', '18:53, 22/4/2022');
    const c7Toc1 = new MessageData(c1,'omg! The sky is stunning!', '18:04, 16/4/2022');


    //initialize map
    contactMap.set(c1.userName, new ContactChatInfo(c1, [c1Toc2, c1Toc3, c1Toc4, c1Toc5, c1Toc6, c1Toc7]));
    contactMap.set(c2.userName, new ContactChatInfo(c2, [c2Toc1, c2Toc3]));
    contactMap.set(c3.userName, new ContactChatInfo(c3, [c3Toc1, c3Toc2]));
    contactMap.set(c4.userName, new ContactChatInfo(c4, [c4Toc1]));
    contactMap.set(c5.userName, new ContactChatInfo(c5, [c5Toc1]));
    contactMap.set(c6.userName, new ContactChatInfo(c6, [c6Toc1]));
    contactMap.set(c7.userName, new ContactChatInfo(c7, [c7Toc1]));
}

export default initialState;
initialState();

export const context =
    {
        token:'',
        server:'https://localhost:7049/api/',
        messages:[],
        currentMessage:{}
    };