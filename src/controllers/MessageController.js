const baseUrl = "/messages";
const Dependencies = require('../constants/enums').Dependencies;

messageController = (server) => {
    
    //Get required service from the container
    if(!this.messageService) {
        const container = server.get(Dependencies.CONTEXT);
        this.messageService = container.get(Dependencies.MESSAGE_SERVICE);
    }

    server.get(baseUrl, (req, res) =>{
        res.send(this.messageService.findAll());
    });

    server.get(`${baseUrl}/:id`, (req, res) => {
        res.send(this.messageService.findOne(req.params.id));
    });

    server.post(baseUrl, (req, res) => {
        let body = req.body;
        res.send(this.messageService.add(body));
    });
};

module.exports = messageController;