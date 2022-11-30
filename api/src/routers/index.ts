// eslint-disable-next-line import/no-import-module-exports
import { Request, Response } from 'express';

const express = require('express');

const tasksRouter = require('./tasksRouter');

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.json({
    status: 200,
    message: 'Hello from router',
  });
});

router.use('/tasks', tasksRouter);

module.exports = router;
