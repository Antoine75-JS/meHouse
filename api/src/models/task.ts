import mongoose from 'mongoose';
import { TaskT } from 'tasksT';

const { Schema } = mongoose;

const taskSchema = new Schema<TaskT>({
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
  isDone: {
    type: Boolean,
    default: false,
    required: true
  },
  repeat: {
    type: Boolean,
    required: true,
    default: false
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  },
  orgaId: {
    type: Schema.Types.ObjectId,
    ref: 'Organisation'
  }
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
