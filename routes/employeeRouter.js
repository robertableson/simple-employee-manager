const express   = require('express');
const Employee  = require('../models/employee');
const router    = express.Router();

//get a list of employees on load
router.get('/employees', function(request, response, next){
  var pageNumber = 1;
  var resultsPerPage = 10;

  if(request.query){
    if(request.query.page){
      pageNumber = parseInt(request.query.page);
    }
    if(request.query.perpage){
      resultsPerPage = parseInt(request.query.perpage);
    }
  }

  Employee.paginate({}, {page: pageNumber, limit: resultsPerPage}, function(err, result) {
    response.send(result);
  }).catch(next); //if pagination fails
});

//add a new employee to db
router.post('/employee', function(request, response, next){
  //mongoose creates and saves an employee object to collection, then gets mongoose promise to send the employee to client
  Employee.create(request.body).then(function(employee){
    response.send(employee);
  }).catch(next); //if create fails
});

//update an employee in db
router.put('/employee/:id', function(request, response, next){
  Employee.findByIdAndUpdate({_id: request.params.id}, request.body).then(function(employee){
    Employee.findOne({_id: request.params.id}).then(function(){
      response.send(employee);
    }).catch(next); //if find fails
  }).catch(next); //if delete fails
});

//delete an employee in db
router.delete('/employee/:id', function(request, response, next){
  Employee.findByIdAndRemove({_id: request.params.id}).then(function(employee){
    response.send(employee);
  }).catch(next); //if delete fails
});

module.exports = router;
