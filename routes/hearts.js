module.exports = function(app) {

  var cors = require('cors');
  var Heart = require('../models/heart.js');

  var corsOptions = {
    origin: 'http://localhost:9000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

  //GET - Return all hearts in the DB
  findAllHearts = function(req, res) {
    Heart.find(function(err, hearts) {
      if(!err) {
        console.log('GET /hearts')
        res.send(hearts);
      } else {
        console.log('ERROR: ' + err);
      }
    });
  };

  //GET - Return a Heart with specified ID
  findById = function(req, res) {
    Heart.findById(req.params.id, function(err, heart) {
      if(!err) {
        console.log('GET /heart/' + req.params.id);
        res.send(heart);
      } else {
        console.log('ERROR: ' + err);
      }
    });
  };

  //POST - Insert a new Heart in the DB
  addHeart = function(req, res) {
    console.log('POST');
    console.log(req.body);

    var heart = new Heart({
      color:    req.body.color,
      size:     req.body.size
    });

    heart.save(function(err) {
      if(!err) {
        console.log('Created');
      } else {
        console.log('ERROR: ' + err);
      }
    });

    res.send(heart);
  };

  //PUT - Update a register already exists
  updateHeart = function(req, res) {
    console.log(req, res)
    Heart.findById(req.params.id, function(err, heart) {
      heart.title   = req.body.petId;
      heart.color    = req.body.color;
      heart.size = req.body.size;

      heart.save(function(err) {
        if(!err) {
          console.log('Updated');
        } else {
          console.log('ERROR: ' + err);
        }
        res.send(heart);
      });
    });
  }

  //DELETE - Delete a heart with specified ID
  deleteHeart = function(req, res) {
    Heart.findById(req.params.id, function(err, heart) {
      heart.remove(function(err) {
        if(!err) {
          console.log('Removed');
        } else {
          console.log('ERROR: ' + err);
        }
      })
    });
  }

  //Link routes and functions
  app.get('/hearts', cors(corsOptions), findAllHearts);
  app.get('/heart/:id', cors(corsOptions), findById);
  app.post('/heart', cors(corsOptions), addHeart);
  app.put('/heart/:id', cors(corsOptions), updateHeart);
  app.delete('/heart/:id', cors(corsOptions), deleteHeart);

}
