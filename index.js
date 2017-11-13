const express     = require('express');
const router      = require('./routes/api');
const bodyParser  = require('body-parser');
const mongoose    = require('mongoose');

//set up express app
const app = express();

//connect to mongodb
mongoose.connect('mongodb://localhost/employeego');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
  console.log("Connected to MongoDB.");
});

//get json http request body
app.use(bodyParser.json());

//init routes
app.use(router);

//error handling middleware
app.use(function(error, request, response, next){
  console.log(error);
  response.status(422).send({error: error._message});
});

//listen for requests
app.listen(process.env.post || 4000, function(){
  console.log('Listening...');
});
