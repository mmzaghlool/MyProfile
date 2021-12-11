import { Request, Response } from 'express';

export default class {
    static async render(req: Request, res: Response) {
        res.render('work/index');
    }
}
