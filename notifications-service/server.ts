const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');
require('dotenv').config();

const routers = require('./src/routers');

const app = express();

app.use(express.json());

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
