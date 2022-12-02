import express, {
  Response,
  Request,
  NextFunction,
  ErrorRequestHandler
} from 'express';

// Dependencies
const cors = require('cors');
const mongoose = require('mongoose');

// CONFIG
require('dotenv').config();

// Router
const routers = require('./src/routers');
const { handleError } = require('./src/middlewares/errorMiddleware');

// App
const app = express();

// Mongo database
const dbUrl = `${process.env.DB_DOCKER_SERVICE_NAME}://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_IP}:${process.env.MONGO_PORT}/${process.env.DB_NAME}?authSource=${process.env.MONGO_ROLE}`;
console.log('dbUrl', dbUrl);

// Tries to connect, waits 3 secs if error then retries
const loopUntilConnected = () => {
  let cpt = 1;
  mongoose
    .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(
      () =>
        console.log(
          `Connected to mongo database as ${process.env.MONGO_ROLE} on try number ${cpt}`
        )
      // eslint-disable-next-line function-paren-newline
    )
    .catch((err: object) => {
      console.log(err);
      cpt += 1;
      setTimeout(loopUntilConnected, 3000);
    });
};

// Start connection loop
loopUntilConnected();

app.use(express.json());

const options = {
  origin: (origin: any, callback: any) => {
    if (process.env.CLIENT_URL) {
      callback(null, true);
      // eslint-disable-next-line brace-style
    } else {
      console.log('cors error');
      callback(new Error('Cors error'));
    }
  },
  credentials: true,
  // accessControlAllowCredentials: true,
  // optionSuccessStatus: 200,
  allowedHeaders: 'Content-Type, Authorization, X-Requested-With',
  methods: 'GET,HEAD,POST,PATCH,DELETE,OPTIONS'
};

app.use(cors(options));
// Allows nginx proxy
app.enable('trust proxy');

app.use('/api', routers);

app.use(
  (
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    handleError(err, res);
  }
);

app.listen(process.env.API_PORT || 3404, () => {
  // eslint-disable-next-line no-console
  console.log(`server running on ${process.env.API_PORT || 3404}`);
});
