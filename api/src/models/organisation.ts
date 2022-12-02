import mongoose from 'mongoose';
import { OrganisationT } from 'organisationsT';

const { Schema } = mongoose;

const organisationSchema = new Schema<OrganisationT>({
  orgName: {
    type: String,
    required: [true, 'Please enter a name for your organisation']
  },
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Category'
    }
  ],
  orgUsers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  orgTasks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Task'
    }
  ]
});

const Organisation = mongoose.model('Organisation', organisationSchema);

export default Organisation;
