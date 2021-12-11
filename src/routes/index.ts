import express, { Request, Response } from 'express';

import home from './home';
import about from './about';
import work from './work';
import packages from './packages';

const router = express();

router.use('/', home);
router.use('/about', about);
router.use('/work', work);
router.use('/packages', packages);

router.get('/404', (_: Request, res: Response) => res.render('404', { title: 'Page Not Found' }));

export default router;
