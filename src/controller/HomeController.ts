import { Request, Response } from 'express';

export default class {
    static async renderHome(req: Request, res: Response) {
        res.render('home/index');
    }
}
