import { keyboard } from "@testing-library/user-event/dist/keyboard";
import { MESSAGES_TYPE } from "../ChatPage/chatHistory-List/Message";

export const Contact = function (userName, password, imageURL, imageAlt, nickname) {
    this.userName = userName;
    this.nickname = nickname;
    this.password = password;
    this.imageURL = imageURL;
    this.imageAlt = imageAlt;
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



export const contactMap = new Map();

function initialState() {
    var c1 = new Contact(
        //'Christian Eriksen',
        'a1',
        'a1',
        '/avatar1.png',
        'avatar',
        'Christians',
    );


    var c2 = new Contact(
        // 'Lionel Messi',
        'b2',
        'b2',
        '/avatar3.png',
        'avatar',
        'LM10',
    );

    var c3 = new Contact(
        // 'Hugo Loris',
        'c3',
        'c3',
        '/avatar5.png',
        'avatar',
        'Loris',
    );

    var c4 = new Contact(
        // 'Son Houng min',
        'd4',
        'd4',
        '/avatar5.png',
        'avatar',
        'Sonny',
    );

    var c5 = new Contact(
        // 'Antonio Conte',
        'e5',
        'e5',
        '/avatar6.png',
        'avatar',
        'Antonio',
    );
    // c2.isActive = true;
    contactMap.set(c1.userName, new ContactChatInfo(c1, [c2, c3, c4]));
    contactMap.set(c2.userName, new ContactChatInfo(c2, [c1, c3]));
    contactMap.set(c3.userName, new ContactChatInfo(c3, [c1, c2]));
    contactMap.set(c4.userName, new ContactChatInfo(c4, [c5]));
    contactMap.set(c5.userName, new ContactChatInfo(c5, []));

    c1.messages.set(c2.userName,
        [
            {
                time: '9:50, 16/4/2022',
                data: ' Hi, how are you?',
                isMyMessage: true,
                type: MESSAGES_TYPE.TEXT
            },
        ]);

    c2.messages.set(c1.userName,
        [
            {
                time: '10:30, 16/4/2022',
                data: ' Hi, how are you?',
                isMyMessage: false,
                type: MESSAGES_TYPE.TEXT
            },
        ]);
    c1.messages.set(c3.userName,
        [
            {
                time: '9:53, 16/4/2022',
                data: ' Hi, how are you? How is the project coming along?',
                isMyMessage: true,
                type: MESSAGES_TYPE.TEXT
            },

            {
                time: '10:00, 16/4/2022',
                data: 'I am good, how are you?',
                isMyMessage: false,
                type: MESSAGES_TYPE.TEXT
            },

            {
                time: '10:02, 16/4/2022',
                data: 'Do you want to meet and work on the project toghether?',
                isMyMessage: false,
                type: MESSAGES_TYPE.TEXT
            },

            {
                time: '10:20, 16/4/2022',
                data: 'NO!',
                isMyMessage: true,
                type: MESSAGES_TYPE.TEXT
            },

            {
                time: '10:30, 16/4/2022',
                data: 'No way!',
                isMyMessage: true,
                type: MESSAGES_TYPE.TEXT
            },
        ]);
    c1.messages.set(c4.userName, []);



    c2.messages.set(c3.userName, []);


    c3.messages.set(c1.userName,
        [
            {
                time: '19:30, 17/4/2022',
                data: ' Hi, how are you? How is the project coming along?',
                isMyMessage: false,
                type: MESSAGES_TYPE.TEXT
            },

            {
                time: '19:40, 17/4/2022',
                data: 'I am good, how are you?',
                isMyMessage: true,
                type: MESSAGES_TYPE.TEXT
            },

            {
                time: '19:46, 17/4/2022',
                data: 'Do you want to meet and work on the project toghether?',
                isMyMessage: true,
                type: MESSAGES_TYPE.TEXT
            },

            {
                time: '19:48, 17/4/2022',
                data: 'NO!',
                isMyMessage: false,
                type: MESSAGES_TYPE.TEXT
            },

            {
                time: '19:48, 17/4/2022',
                data: 'No way!',
                isMyMessage: false,
                type: MESSAGES_TYPE.TEXT
            },
        ]);
    c3.messages.set(c2.userName, []);

    c4.messages.set(c5.userName, []);

    c5.messages.set(c4.userName, []);


    console.log(contactMap);
}


export default initialState;

// check!
// function addMessage(userName, text) {
//     const item = contactMap.get(userName);
//     if (item != null) {
//         item.latestMessage = text;
//         item.messages.push(text);
//     }
// }


/*contactMap.get(c4.userName).contactList.map()*/

    // console.log(contactMap);



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