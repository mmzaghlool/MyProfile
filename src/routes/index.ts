import express, { Request, Response } from 'express';

// import admin from './admin';;

const router = express();

// router.use('/admin', admin);

router.get('/404', (_: Request, res: Response) => res.render('404', {title: 'Page Not Found'}));

export default router;
