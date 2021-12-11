import jwt from 'jsonwebtoken';

import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from './constants';
import { TOKEN_TYPES } from '../models/UserTokens';

export default class JWT {
    static signJWT(uid: string, tokenType: TOKEN_TYPES, createdAt: string) {
        let expiresIn;
        let secret;
        try {
            if (tokenType === TOKEN_TYPES.ACCESS) {
                secret = ACCESS_TOKEN_SECRET;
                expiresIn = '12h';
            } else {
                secret = REFRESH_TOKEN_SECRET;
                expiresIn = '1w';
            }

            if (!secret) {
                throw new Error('secret undefined: ' + tokenType);
            }

            const user = { uid, createdAt };
            return jwt.sign(user, secret, { expiresIn });
        } catch (err) {
            throw err;
        }
    }

    static verifyJWT(token: string, tokenType: TOKEN_TYPES): { uid: string; createdAt: string } {
        let secret;
        try {
            if (tokenType === TOKEN_TYPES.ACCESS) {
                secret = ACCESS_TOKEN_SECRET;
            } else {
                secret = REFRESH_TOKEN_SECRET;
            }

            if (!secret) {
                throw new Error('secret undefined: ' + tokenType);
            }

            const decoded: any = jwt.verify(token, secret);

            return { uid: decoded.uid, createdAt: decoded.createdAt };
        } catch (err) {
            throw err;
        }
    }
}
