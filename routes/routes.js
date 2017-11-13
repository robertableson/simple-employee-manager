const express   = require('express');
const employeeRouter = require('./employeeRouter');

//init routes obj
const routes = express();

//add routes to routes obj
routes.use(employeeRouter);

//export routes
module.exports = routes;
