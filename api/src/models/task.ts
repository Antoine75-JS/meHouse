const mongoose = require('mongoose');

const { Schema } = mongoose;

const tasksSchema = new Schema({
  taskName: {
    type: String,
    required: [true, 'Please enter a name for the task']
  },
  creationDate: {
    type: Date,
    default: Date.now()
  },
  expireDate: {
    type: Date
  },
  repeatFrequency: {
    type: Number
  },
  repeat: {
    type: Boolean,
    required: true,
    default: false
  }
});

const Tasks = mongoose.model('Tasks', tasksSchema);

module.exports = Tasks;
