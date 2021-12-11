import { DataTypes, JoinedTablesType, JOIN_TYPES, MasterTableType } from 'nodejs-express-utils';
import bcrypt from 'bcrypt';
import Database from '../core/Database';
import UserPermissionsModel from './UserPermissions';

export enum USER_POSITIONS {
    // eslint-disable-next-line no-unused-vars
    MEDICAL_REP = 'MEDICAL_REP',
    // eslint-disable-next-line no-unused-vars
    MANAGER = 'MANAGER',
    // eslint-disable-next-line no-unused-vars
    DISTRICT_MANAGER = 'DISTRICT_MANAGER',
    // eslint-disable-next-line no-unused-vars
    ACCOUNT_MANAGER = 'ACCOUNT_MANAGER',
    // eslint-disable-next-line no-unused-vars
    KEY_ACCOUNT_MANAGER = 'KEY_ACCOUNT_MANAGER',
    // eslint-disable-next-line no-unused-vars
    PRODUCT_MANAGER = 'PRODUCT_MANAGER',
    // eslint-disable-next-line no-unused-vars
    PROJECT_MANAGER = 'PROJECT_MANAGER',
    // eslint-disable-next-line no-unused-vars
    DIGITAL_MANAGER = 'DIGITAL_MANAGER',
    // eslint-disable-next-line no-unused-vars
    CEO = 'CEO',
    // eslint-disable-next-line no-unused-vars
    CTO = 'CTO',
}

export type userType = {
    uid?: string;
    companyId: bigint;
    createdAt?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    position?: USER_POSITIONS;
    isActive?: number;
    passwordHash?: string;
};

const tableName: string = 'users';

const UserModel = Database.init<userType>(tableName, {
    uid: {
        type: DataTypes.CHAR,
        isRequired: true,
        isEncrypted: false,
    },
    companyId: {
        type: DataTypes.UNSIGNED,
        isEncrypted: false,
        isRequired: true,
    },
    createdAt: {
        type: DataTypes.DATETIME,
        isEncrypted: false,
        isRequired: false,
    },
    firstName: {
        type: DataTypes.CHAR,
        isEncrypted: true,
        isRequired: true,
    },
    lastName: {
        type: DataTypes.CHAR,
        isEncrypted: true,
        isRequired: true,
    },
    email: {
        type: DataTypes.CHAR,
        isEncrypted: true,
        isRequired: true,
    },
    phone: {
        type: DataTypes.CHAR,
        isEncrypted: true,
        isRequired: false,
    },
    position: {
        type: DataTypes.CHAR,
        isEncrypted: true,
        isRequired: false,
    },
    isActive: {
        type: DataTypes.UNSIGNED,
        isEncrypted: false,
        isRequired: false,
    },
    passwordHash: {
        type: DataTypes.CHAR,
        isEncrypted: false,
        isRequired: true,
    },
});

export default UserModel;

export async function getProfile(uid: string) {
    const masterTable: MasterTableType = {
        table: UserModel,
        tableAlias: 'U',
        reqColumns: ['uid', 'companyId', 'firstName', 'lastName', 'position', 'isActive'],
    };
    const joinedTables: JoinedTablesType = [
        {
            table: UserPermissionsModel,
            tableAlias: 'UP',
            joinType: JOIN_TYPES.INNER,
            joinCondition: `U.uid=UP.uid`,
        },
    ];

    const extraQuery = `WHERE U.uid=:uid`;

    return Database.executeJoin(masterTable, joinedTables, extraQuery, { uid }).then((results) => results[0]);
}

export async function checkPassword(credential: string, password: string) {
    const reqColumns = ['uid', 'passwordHash'];
    const extraQuery = `WHERE uid=:credential OR email=#:credential OR phone=#:credential`;

    return UserModel.get(extraQuery, { credential }, reqColumns).then(async (results) => {
        const user = results[0];

        if (!user || !user.uid || !user.passwordHash) {
            return false;
        }

        const isValid = await bcrypt.compare(password, user.passwordHash);

        return isValid ? user.uid : false;
    });
}
