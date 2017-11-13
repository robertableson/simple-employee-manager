const mongoose          = require('mongoose');
const Schema            = mongoose.Schema;
const mongoosePaginate  = require('mongoose-paginate');

//create employee schema and model
const EmployeeSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required']
  },
  birthDate: {
    type: Date,
    required: [true, 'Birth date is required']
  },
  hireDate: {
    type: Date,
    required: [true, 'Hire date is required']
  },
  hourlySalary: {
    type: Number,
    required: [true, 'Hourly salary is required']
  }
});

//enable pagination on EmployeeSchema
EmployeeSchema.plugin(mongoosePaginate);

//the Employee model will represent the employee collection in mongodb
const Employee = mongoose.model('employee', EmployeeSchema);

module.exports = Employee;
