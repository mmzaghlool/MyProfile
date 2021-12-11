import { Request, Response } from 'express';
import contacts from '../data/contact.json';
import profile from '../data/profile.json';

export default class {
    static async render(req: Request, res: Response) {
        res.render('home/index', { profile, contacts });
    }
}
