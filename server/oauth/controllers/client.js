var Client = require('../model/client');
exports.postclients=()=>{
  var client = new Client();
  client.name = req.body.name;
  client.id = req.body.id;
  client.secret = req.body.secret;
  client.userId = req.user._id;

  client.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Client added to the locker!', data: client });
  });
};

exports.getClients = function(req, res) {
  // Use the Client model to find all clients
  Client.find({ userId: req.user._id }, function(err, clients) {
    if (err)
      res.send(err);

    res.json(clients);
  });
};
