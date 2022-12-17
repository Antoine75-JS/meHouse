// eslint-disable-next-line import/no-import-module-exports
import { Request, Response } from 'express';

import express from 'express';

const router = express.Router();

router.get('/', (_, res: Response) => {
  res.json({
    status: 200,
    message: 'Hello from notifications'
  });
});

module.exports = router;
