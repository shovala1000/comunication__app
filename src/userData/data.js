import {MESSAGES_TYPE} from "../ChatPage/chatHistory-List/Message";

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
    var c1 = new Contact(
        'a1',
        'a1',
        null,
        'aa',
    );


    var c2 = new Contact(
        'b2',
        'b2',
        '/avatar3.png',
        'bb',
    );

    var c3 = new Contact(
        'c3',
        'c3',
        '/avatar5.png',
        'cc',
    );

    var c4 = new Contact(
        'd4',
        'd4',
        '/avatar5.png',
        'dd',
    );

    var c5 = new Contact(
        'e5',
        'e5',
        '/avatar6.png',
        'ee',
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

    sendMessageTo(c1, c2, [new Message('9:50, 16/4/2022', 'Hi, how are you?', true, MESSAGES_TYPE.TEXT)]);
    sendMessageTo(c1, c3, [
        new Message('9:53, 16/4/2022', ' Hi, how are you? How is the project coming along?', true, MESSAGES_TYPE.TEXT),
        new Message('10:00, 16/4/2022', 'I am good, how are you?', false, MESSAGES_TYPE.TEXT),
        new Message('10:02, 16/4/2022', 'Do you want to meet and work on the project toghether?', false, MESSAGES_TYPE.TEXT),
        new Message('10:20, 16/4/2022', 'NO!', true, MESSAGES_TYPE.TEXT),
        new Message('10:30, 16/4/2022', 'No way!', true, MESSAGES_TYPE.TEXT)]);
    sendMessageTo(c1, c4, []);
    sendMessageTo(c2, c3, []);


    //initialize last message and time
    const c1Toc2 = new MessageData(c2, 'Hi, how are you?', '9:50, 16/4/2022');
    const c1Toc3 = new MessageData(c3, 'No way!', '10:30, 16/4/2022');
    const c1Toc4 = new MessageData(c4, '', '');
    const c2Toc1 = new MessageData(c1, 'Hi, how are you?', '9:50, 16/4/2022');
    const c2Toc3 = new MessageData(c3, '', '');
    const c3Toc1 = new MessageData(c1, 'No way!', '10:30, 16/4/2022');
    const c3Toc2 = new MessageData(c2, '', '');
    const c4Toc1 = new MessageData(c1, '', '');

    //initialize map
    contactMap.set(c1.userName, new ContactChatInfo(c1, [c1Toc2, c1Toc3, c1Toc4]));
    contactMap.set(c2.userName, new ContactChatInfo(c2, [c2Toc1, c2Toc3]));
    contactMap.set(c3.userName, new ContactChatInfo(c3, [c3Toc1, c3Toc2]));
    contactMap.set(c4.userName, new ContactChatInfo(c4, [c4Toc1]));
    contactMap.set(c5.userName, new ContactChatInfo(c5, []));

}

export default initialState;
initialState();
