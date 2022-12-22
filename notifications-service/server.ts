import express from 'express';
const mongoose = require('mongoose');
const amqp = require('amqplib/callback_api');

const cors = require('cors');
require('dotenv').config();

const routers = require('./src/routers');

const app = express();
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

const connectRabbit = async () => {
  await amqp.connect(
    process.env.RABBIT_HOSTNAME,
    function (
      error0: any,
      connection: {
        createChannel: (arg0: (error1: any, channel: any) => void) => void;
      }
    ) {
      if (error0) {
        throw error0;
      }
      connection.createChannel(function (error1, channel) {
        if (error1) {
          throw error1;
        }

        channel.assertQueue(process.env.RABBIT_QUEUE_NAME, {
          durable: false
        });

        console.log(
          ' [*] Waiting for messages in %s. To exit press CTRL+C',
          process.env.RABBIT_QUEUE_NAME
        );

        channel.consume(
          process.env.RABBIT_QUEUE_NAME,
          function (msg: { content: { toString: () => any } }) {
            console.log(' [x] Received %s', msg.content.toString());
          },
          {
            noAck: true
          }
        );
      });
    }
  );
};

setTimeout(() => {
  console.log('connecting rabbit notifications consumer');
  connectRabbit();
}, 6000);

const fallbackPort = 3405;
app.listen(process.env.NOTIFICATIONS_PORT || fallbackPort, () => {
  console.log(
    `server running on ${process.env.NOTIFICATIONS_PORT || fallbackPort}`
  );
});
