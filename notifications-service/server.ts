import express from 'express';
const mongoose = require('mongoose');
import createMQConsumer from './src/config/rabbit-config';

const cors = require('cors');
require('dotenv').config();

const routers = require('./src/routers');

const app = express();

const consumer = createMQConsumer(
  process.env.RABBIT_HOSTNAME,
  process.env.RABBIT_QUEUE_NAME
);

consumer();

app.use(express.json());

// Mongo database
const dbUrl = `${process.env.MONGO_IP}://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.DB_DOCKER_SERVICE_NAME}:${process.env.MONGO_PORT}/${process.env.DB_NAME}?authSource=${process.env.MONGO_ROLE}`;

// Tries to connect, waits 3 secs if error then retries
const loopUntilConnected = () => {
  let cpt = 1;
  mongoose
    .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() =>
      console.log(
        `Connected to mongo database as ${process.env.MONGO_ROLE} on try number ${cpt}`
      )
    )
    .catch((err: object) => {
      console.log(err);
      cpt += 1;
      setTimeout(loopUntilConnected, 3000);
    });
};

// Start connection loop
loopUntilConnected();

const options = {
  origin: (origin: any, callback: any) => {
    if (process.env.CLIENT_URL) {
      callback(null, true);
    } else {
      console.log('cors error');
      callback(new Error('Cors error'));
    }
  },
  credentials: true,
  allowedHeaders: 'Content-Type, Authorization, X-Requested-With',
  methods: 'GET,HEAD,POST,PATCH,DELETE,OPTIONS'
};

app.use(cors(options));
// Allows nginx proxy
app.enable('trust proxy');

app.use('/notifications', routers);

const fallbackPort = 3405;
app.listen(process.env.NOTIFICATIONS_PORT || fallbackPort, () => {
  console.log(
    `server running on ${process.env.NOTIFICATIONS_PORT || fallbackPort}`
  );
});
