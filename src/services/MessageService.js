const Exception = require('../models/Exception');

class MessageService {

    constructor(repository) {
        this.repository = repository;
    }

    //#region GET

    findAll() {
        return this.repository.findAll();
    }

    findOne(id) {
        if(typeof(id) === 'string')
            id = parseInt(id);
        let message =  this.repository.findOne(id);
        if(!message)
            throw new Exception(404, "No message found for specified ID");
        return message;
    }

    //#endregion

    //#region ADD

    add(message) {
        let messageToCreate = {...message};
        return this.repository.add(messageToCreate);
    }

    //#endregion

}

module.exports = MessageService;