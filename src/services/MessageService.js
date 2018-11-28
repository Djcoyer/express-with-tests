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
        return this.repository.findOne(id);
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