import express from 'express';
import HomeController from '../controller/HomeController';

const router = express();

router.get('/', HomeController.renderHome);

export default router;
