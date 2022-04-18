export const Contact = function (userName, imageURL, imageAlt, nickname) {
    this.userName = userName;
    this.imageURL = imageURL
    this.imageAlt = imageAlt;
    this.nickname = nickname;
    this.isActive = false;
    this.latestMessage = "bla bla";
    this.latestMessageTime = "1 minute ago";
    this.messages = [];
}


export const contactMap = new Map();


function initialState() {
    var c1 = new Contact(
        'Christian Eriksen',
        'avatar4.png',
        'avatar',
        'Christian',
    );


    contactMap.set(c1.userName, c1);

    var c2 = new Contact(
        'Lionel Messi',
        'avatar3.png',
        'avatar',
        'LM10',
    );
    contactMap.set(c2.userName, c2);
    c1.isActive = true;

    var c3 = new Contact(
        'Hugo Loris',
        'avatar5.png',
        'avatar',
        'Loris',
    );
    contactMap.set(c3.userName, c3);

    var c4 = new Contact(
        'Son Houng min',
        'avatar5.png',
        'avatar',
        'Sonny',
    );
    contactMap.set(c4.userName, c4);

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




    c2.messages =
        [
            {
                time: '10:10 AM, Today',
                data: ' Hi, how are you?',
                isMyMessage: false,
            },
        ]

    c1.messages =
        [
            {
                time: '10:10 AM, Today',
                data: ' Hi, how are you? How is the project coming along?',
                isMyMessage: false,
            },

            {
                time: '10:12 AM, Today',
                data: 'I am good, how are you?',
                isMyMessage: true,
            },

            {
                time: '10:13 AM, Today',
                data: 'Do you want to meet and work on the project toghether?',
                isMyMessage: true,
            },

            {
                time: '11:10 AM, Today',
                data: 'NO!',
                isMyMessage: false,
            },

            {
                time: '11:10 AM, Today',
                data: 'No way!',
                isMyMessage: false,
            },
        ]

}


initialState();

function addMessage(userName, text) {
    const item = contactMap.get(userName);
    if (item != null) {
        item.latestMessage = text;
        item.messages.push(text);
    }
}






