import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Please enter a username']
  },
  email: {
    type: String,
    unique: [true, 'Email already exists'],
    required: [true, 'Please enter a username']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password']
  }
});

const User = mongoose.model('User', userSchema);

export default User;
