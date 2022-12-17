import mongoose from 'mongoose';

import { NotificationT } from 'notification';

const { Schema } = mongoose;

const notificationSchema = new Schema<NotificationT>(
  {
    orgaId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    url: {
      type: String
    },
    content: {
      type: String,
      required: true
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    senderId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
