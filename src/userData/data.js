import { MESSAGES_TYPE } from "../ChatPage/chatHistory-List/Message";

export const Contact = function (userName,password, imageURL, imageAlt, nickname) {
    this.userName = userName;
    this.nickname = nickname;
    this.password = password;
    this.imageURL = imageURL;
    this.imageAlt = imageAlt;
    this.type = null;
    this.latestMessage = "bla bla";
    this.latestMessageTime = "1 minute ago";
    this.messages = new Map();
    this.isActive = false;
}


export const ContactChatInfo = function (mainContact, contactList){
    this.mainContact = mainContact;
    this.contactList = contactList;
    if (contactList.length !== 0) {
        contactList[0].isActive = true;
    } else {
       
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
        'Christian',
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
    // c2.isActive = true;
    contactMap.set(c4.userName,new ContactChatInfo(c4,[]));
    contactMap.set(c3.userName, new ContactChatInfo(c3,[c1,c2]));
    contactMap.set(c2.userName,new ContactChatInfo(c2,[c1,c3]));
    contactMap.set(c1.userName, new ContactChatInfo(c1,[c2,c3,c4]));

     c1.messages.set(c2.userName,
        [
            {
                time: '10:10 AM, Today',
                data: ' Hi, how are you?',
                isMyMessage: true,
                type: MESSAGES_TYPE.TEXT
            },
        ]);
    c1.messages.set(c3.userName,
        [
            {
                time: '10:10 AM, Today',
                data: ' Hi, how are you? How is the project coming along?',
                isMyMessage: true,
                type: MESSAGES_TYPE.TEXT
            },

            {
                time: '10:12 AM, Today',
                data: 'I am good, how are you?',
                isMyMessage: false,
                type: MESSAGES_TYPE.TEXT
            },

            {
                time: '10:13 AM, Today',
                data: 'Do you want to meet and work on the project toghether?',
                isMyMessage: false,
                type: MESSAGES_TYPE.TEXT
            },

            {
                time: '11:10 AM, Today',
                data: 'NO!',
                isMyMessage: true,
                type: MESSAGES_TYPE.TEXT
            },

            {
                time: '11:10 AM, Today',
                data: 'No way!',
                isMyMessage: true,
                type: MESSAGES_TYPE.TEXT
            },
        ]);
    c1.messages.set(c4.userName,[]);


    c2.messages.set(c1.userName,
        [
            {
                time: '10:10 AM, Today',
                data: ' Hi, how are you?',
                isMyMessage: true,
                type: MESSAGES_TYPE.TEXT
            },
        ]);
    c2.messages.set(c3.userName,[]);


    c3.messages.set(c1.userName,
        [
            {
                time: '10:10 AM, Today',
                data: ' Hi, how are you? How is the project coming along?',
                isMyMessage: false,
                type: MESSAGES_TYPE.TEXT
            },

            {
                time: '10:12 AM, Today',
                data: 'I am good, how are you?',
                isMyMessage: true,
                type: MESSAGES_TYPE.TEXT
            },

            {
                time: '10:13 AM, Today',
                data: 'Do you want to meet and work on the project toghether?',
                isMyMessage: true,
                type: MESSAGES_TYPE.TEXT
            },

            {
                time: '11:10 AM, Today',
                data: 'NO!',
                isMyMessage: false,
                type: MESSAGES_TYPE.TEXT
            },

            {
                time: '11:10 AM, Today',
                data: 'No way!',
                isMyMessage: false,
                type: MESSAGES_TYPE.TEXT
            },
        ]);
    c3.messages.set(c2.userName,[]);

    c4.messages.set(c1.userName,[]);
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
