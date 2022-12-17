// eslint-disable-next-line import/no-import-module-exports
import { Request, Response } from 'express';

import express from 'express';

const router = express.Router();

router.get('/', (_, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Hello from notifications'
  });
});

module.exports = router;
