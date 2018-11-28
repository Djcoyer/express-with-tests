const express = require('express');
const Container = require('./container');
const MessageService = require('./services/MessageService');
const MessageRepository = require('./repositories/MessageRepository');
const messageController = require('./controllers/MessageController');
const Dependencies = require('./constants/enums').Dependencies;
const bodypareser = require('body-parser');

const app = new express();

const container = new Container();
//Register dependencies at startup
container.register(Dependencies.MESSAGE_REPOSITORY, MessageRepository);
container.register(Dependencies.MESSAGE_SERVICE, MessageService, [Dependencies.MESSAGE_REPOSITORY]);

//Add the container to the application to be consumed by the controllers
app.set(Dependencies.CONTEXT, container);
app.use(bodypareser.json());

messageController(app);
app.listen(3000);