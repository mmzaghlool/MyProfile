import express, { Request, Response } from 'express';

import home from './home';

const router = express();

router.use('/', home);

router.get('/404', (_: Request, res: Response) => res.render('404', { title: 'Page Not Found' }));

export default router;
