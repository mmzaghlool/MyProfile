import express from 'express';
import AboutController from '../controller/AboutController';

const router = express();

router.get('/', AboutController.render);

export default router;
