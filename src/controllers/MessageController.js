const baseUrl = "/messages";
const Dependencies = require('../constants/enums').Dependencies;

messageController = (server) => {
    
    //Get required service from the container
    if(!this.messageService) {
        const container = server.get(Dependencies.CONTEXT);
        this.messageService = container.get(Dependencies.MESSAGE_SERVICE);
    }

    server.get(baseUrl, (req, res) => { 
        try {
        res.send(this.messageService.findAll());
        } catch(err) {
            res.status(err.code).send(err);
        }
    });

    server.get(`${baseUrl}/:id`, (req, res) => {
        try {
            res.send(this.messageService.findOne(req.params.id));
        } catch(err) {
            res.status(err.code).send({code:err.code, message:err.message});
        }
    });

    server.post(baseUrl, (req, res) => {
        let body = req.body;
        try {
            res.send(this.messageService.add(body));
        } catch(err) {
            res.status(err.code).send(err.message);
        }
    });
};

module.exports = messageController;