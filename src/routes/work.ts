import express from 'express';
import WorkController from '../controller/WorkController';

const router = express();

router.get('/', WorkController.render);

export default router;
