import express from 'express';

require('dotenv').config();

const app = express();

app.use(express.json());

app.listen(process.env.API_PORT || 3404, () => {
  // eslint-disable-next-line no-console
  console.log(`server running on ${process.env.API_PORT || 3404}`);
});
