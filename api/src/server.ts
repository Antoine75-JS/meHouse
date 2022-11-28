import express from 'express';

// CONFIG
require('dotenv').config();

// ROUTERS
const routers = require('./routers');

const app = express();

app.use(express.json());

app.use('/api', routers);

app.listen(process.env.API_PORT || 3404, () => {
  // eslint-disable-next-line no-console
  console.log(`server running on ${process.env.API_PORT || 3404}`);
});
