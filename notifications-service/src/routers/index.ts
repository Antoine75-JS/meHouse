// eslint-disable-next-line import/no-import-module-exports
import { Request, Response } from 'express';

import express from 'express';

const router = express.Router();
const invitationsRouter = require('./invitationsRouter');

router.get('/', (_, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Hello from notifications'
  });
});

router.use('/invitations', invitationsRouter);

module.exports = router;
