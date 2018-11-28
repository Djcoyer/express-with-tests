const MessageService = require('../src/services/MessageService');
const Exception = require('../src/models/Exception');

var messages = [
    {id: 1, message: "Hello, World!"},
    {id: 2, message: "Hello, Universe!"},
    {id: 3, message: "Hello, World!"}
]


var repository = {
    findOne: jest.fn((id) => {
        return messages.find(m => m.id === id);
    }),
    findAll: jest.fn(() => {
        return messages;
    }),
    add: jest.fn((message) => {
        return {...message, id: 4};
    })
}


describe("Message Service", () => {

    let messageService;

    beforeAll(() => {
        messageService = new MessageService(repository);
    });

    afterEach(() => {
        repository.findOne.mockClear();
        repository.findAll.mockClear();
        repository.add.mockClear();
    });


    it("Returns correct messages on find all", () => {
        let _messages = messageService.findAll();
        expect(repository.findAll).toHaveBeenCalled();
        expect(repository.findAll).toHaveBeenCalledTimes(1);
        expect(_messages).not.toBe(null);
        expect(_messages.length).toEqual(messages.length);
    });

    it("Returns one message on find one", () => {
        let message = messageService.findOne(1);
        expect(repository.findOne).toHaveBeenCalled();
        expect(repository.findOne).toHaveBeenCalledTimes(1);
        expect(message).toBeTruthy();
        expect(messages).toContain(message);
    });

    it("Throws error when it cannot find message with ID", () => {
        expect(() => messageService.findOne(5)).toThrow(Exception);
        expect(repository.findOne).toHaveBeenCalledTimes(1);
        expect(repository.findOne).toHaveBeenCalledWith(5);
    });

    it("Returns message on successful addition", () => {
        let returnedMessage = messageService.add("Hello, Solar System!");
        expect(returnedMessage).not.toBe(null);
        expect(repository.add).toHaveBeenCalledTimes(1);
        expect(returnedMessage.id).toEqual(4);
    });

});