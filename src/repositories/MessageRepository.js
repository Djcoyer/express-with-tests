class MessageRepository {
    
    /*Real world scenario, we would inject an actual db here:

    constructor(db) {
        this.db = db;
    }

    findAll() {
        return this.db.messages;
    }

    */
    constructor() {
        this.messages = [
            {id: 1, message: "Hello, World!"},
            {id: 2, mesage: "Yo, Planet!"},
            {id: 3, message: "Howdy, Y'all!"}
        ];
        this.lastId = 3;
    }

    findAll() {
        return this.messages;
    }

    findOne(id) {
        return this.messages.find(m => m.id === id);
    }


    add(message) {
        this.lastId++;
        message.id = this.lastId;
        this.messages.push(message);
        return message;
    }
}

module.exports = MessageRepository;