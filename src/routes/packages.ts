import express from 'express';
import PackagesController from '../controller/PackagesController';

const router = express();

router.get('/', PackagesController.render);

export default router;
