import express from 'express';

const cors = require('cors');

// CONFIG
require('dotenv').config();

// ROUTERS
const routers = require('./routers');

const app = express();

app.use(express.json());

const options = {
  origin: (origin: any, callback: any) => {
    if (process.env.CLIENT_URL) {
      callback(null, true);
    } else {
      callback(new Error('Cors error'));
    }
  },
  credentials: true,
  // accessControlAllowCredentials: true,
  // optionSuccessStatus: 200,
  allowedHeaders: 'Content-Type, Authorization, X-Requested-With',
  methods: 'GET,HEAD,POST,PATCH,DELETE,OPTIONS',
};

app.use(cors(options));
// Allows nginx proxy
app.enable('trust proxy');

app.use('/api', routers);

app.listen(process.env.API_PORT || 3404, () => {
  // eslint-disable-next-line no-console
  console.log(`server running on ${process.env.API_PORT || 3404}`);
});
