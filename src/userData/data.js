import {MESSAGES_TYPE} from "../ChatPage/chatHistory-List/Message";

export const Contact = function (userName, password, imageURL, nickname) {
    this.userName = userName;
    this.nickname = nickname;
    this.password = password;
    if(imageURL){
        this.imageURL = imageURL;
    }
    else {this.imageURL = '/defalut-profile-picture.png';}
    this.imageAlt = 'avatar';
    this.type = null;
    this.latestMessage = "";
    this.latestMessageTime = "";
    this.messages = new Map();
    this.isActive = false;
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


export const contactMap = new Map();

function initialState() {
    var c1 = new Contact(
        //'Christian Eriksen',
        'a1',
        'a1',
        null,
        // '/avatar1.png',
        'Christiansxxxxxxxxxxxxxxxxxxx',
    );


    var c2 = new Contact(
        // 'Lionel Messi',
        'b2',
        'b2',
        '/avatar3.png',
        'LM10',
    );

    var c3 = new Contact(
        // 'Hugo Loris',
        'c3',
        'c3',
        '/avatar5.png',
        'Loris',
    );

    var c4 = new Contact(
        // 'Son Houng min',
        'd4',
        'd4',
        '/avatar5.png',
        'Sonny',
    );

    var c5 = new Contact(
        // 'Antonio Conte',
        'e5',
        'e5',
        '/avatar6.png',
        'Antonio',
    );
    contactMap.set(c1.userName, new ContactChatInfo(c1, [c2, c3, c4]));
    contactMap.set(c2.userName, new ContactChatInfo(c2, [c1, c3]));
    contactMap.set(c3.userName, new ContactChatInfo(c3, [c1, c2]));
    contactMap.set(c4.userName, new ContactChatInfo(c4, [c1]));
    contactMap.set(c5.userName, new ContactChatInfo(c5, []));


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

    sendMessageTo(c1, c2, [new Message('9:50, 16/4/2022', ' Hi, how are you?', true, MESSAGES_TYPE.TEXT)]);
    sendMessageTo(c1, c3, [
        new Message('9:53, 16/4/2022', ' Hi, how are you? How is the project coming along?', true, MESSAGES_TYPE.TEXT),
        new Message('10:00, 16/4/2022', 'I am good, how are you?', false, MESSAGES_TYPE.TEXT),
        new Message('10:02, 16/4/2022', 'Do you want to meet and work on the project toghether?', false, MESSAGES_TYPE.TEXT),
        new Message('10:20, 16/4/2022', 'NO!', true, MESSAGES_TYPE.TEXT),
        new Message('10:30, 16/4/2022', 'No way!', true, MESSAGES_TYPE.TEXT)]);
    sendMessageTo(c1, c4, []);
    sendMessageTo(c2, c3, []);
}


export default initialState;
console.log("initialState");
initialState();
// check!
// function addMessage(userName, text) {
//     const item = contactMap.get(userName);
//     if (item != null) {
//         item.latestMessage = text;
//         item.messages.push(text);
//     }
// }


/*contactMap.get(c4.userName).contactList.map()*/



// var c5 = new Contact(
//     'Antonio Conte',
//     'avatar5.png',
//     'avatar',
//     'Antonio',
// );
// contactMap.set(c5.userName, c5);

// var c6 = new Contact(
//     'Cristiano Ronaldo',
//     'avatar5.png',
//     'avatar',
//     'CR7',
// );
// contactMap.set(c6.userName, c6);

// var c7 = new Contact(
//     'Harry Kane',
//     'avatar5.png',
//     'avatar',
//     'HK10',
// );
// contactMap.set(c7.userName, c7);