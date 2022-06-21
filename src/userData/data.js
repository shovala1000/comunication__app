export const context =
    {
        contactId: '',
        connection: '',
        isAleardyConnected: '',
        token: '',
        server: 'http://localhost:7049/api/',
        ratings: 'http://localhost:5219/Ratings',
        messages: [],
        currentMessage: {},
        listConatcts: []
    };
export const pushToListConatcts = (c) => {
    if (context.listConatcts.find((contact) => contact.id === c.id) === undefined) {
        context.listConatcts.push(c);
    }
}
