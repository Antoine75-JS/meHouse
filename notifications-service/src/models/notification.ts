import mongoose from 'mongoose';

import { NotificationT } from 'notification';

const { Schema } = mongoose;

const notificationSchema = new Schema<NotificationT>(
  {
    orgaId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    actionUrl: {
      type: String
    },
    content: {
      type: String,
      required: true
    },
    receiverEmail: {
      type: String,
      required: true
    },
    senderId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    isRead: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  { timestamps: true }
);

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
