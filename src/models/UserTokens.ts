import moment from 'moment';
import { DataTypes } from 'nodejs-express-utils';
import Database from '../core/Database';
import JWT from '../utils/JWT';

export enum TOKEN_TYPES {
    // eslint-disable-next-line no-unused-vars
    ACCESS = 'ACCESS',
    // eslint-disable-next-line no-unused-vars
    REFRESH = 'REFRESH',
}

export type userTokenType = {
    tokenId?: bigint;
    uid: string;
    createdAt?: string;
    isExpired?: number;
    lastUsedAt?: string;
    type: string;
};

const tableName: string = 'userTokens';

const UserTokenModel = Database.init<userTokenType>(tableName, {
    tokenId: {
        type: DataTypes.UNSIGNED,
        isRequired: false,
        isEncrypted: false,
    },
    uid: {
        type: DataTypes.CHAR,
        isEncrypted: false,
        isRequired: false,
    },
    createdAt: {
        type: DataTypes.DATETIME,
        isEncrypted: false,
        isRequired: false,
    },
    isExpired: {
        type: DataTypes.UNSIGNED,
        isEncrypted: false,
        isRequired: false,
    },
    lastUsedAt: {
        type: DataTypes.DATETIME,
        isEncrypted: false,
        isRequired: false,
    },
    type: {
        type: DataTypes.CHAR,
        isEncrypted: false,
        isRequired: true,
    },
});

export default UserTokenModel;

export async function generateToken(uid: string, type: TOKEN_TYPES) {
    const createdAt = moment().utc().format();

    const token = JWT.signJWT(uid, type, createdAt);

    return UserTokenModel.create({ uid, type, createdAt }).then((r) => token);
}

export async function checkToken(token: string, type: TOKEN_TYPES) {
    const decoded = JWT.verifyJWT(token, type);

    if (!decoded.uid) {
        return false;
    }

    const extraQuery = `WHERE uid=:uid AND type=:type AND createdAt=:createdAt`;

    return UserTokenModel.get(extraQuery, { uid: decoded.uid, type, createdAt: decoded.createdAt }).then(
        async (results) => {
            const token = results[0];

            const isValid = token && token.isExpired === 0;

            if (isValid) {
                const lastUsedAt = moment().utc().format();

                await UserTokenModel.update({ lastUsedAt }, `WHERE tokenId=:tokenId `, { tokenId: token.tokenId });
            }
            return isValid ? decoded.uid : false;
        },
    );
}

export async function expireToken(token: string, uid: string, type: TOKEN_TYPES) {
    const decoded = JWT.verifyJWT(token, type);

    if (!decoded.uid || uid !== decoded.uid) {
        return false;
    }

    const extraQuery = `WHERE uid=:uid AND type=:type AND createdAt=:createdAt`;

    return UserTokenModel.get(extraQuery, { uid: decoded.uid, type, createdAt: decoded.createdAt }).then(
        async (results) => {
            const token = results[0];

            const isValid = token && token.isExpired === 0;

            if (isValid) {
                await UserTokenModel.update({ isExpired: 1 }, `WHERE tokenId=:tokenId `, { tokenId: token.tokenId });
            }
        },
    );
}
