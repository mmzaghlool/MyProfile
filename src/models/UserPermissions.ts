import { DataTypes } from 'nodejs-express-utils';
import Database from '../core/Database';

export enum PERMISSIONS {
    // eslint-disable-next-line no-unused-vars
    AD_MANAGER = 'AD_MANAGER',
    // eslint-disable-next-line no-unused-vars
    DOCTOR_AD = 'DOCTOR_AD',
    // eslint-disable-next-line no-unused-vars
    PATIENT_AD = 'PATIENT_AD',
    // eslint-disable-next-line no-unused-vars
    DOCTOR_MEETING = 'DOCTOR_MEETING',
    // eslint-disable-next-line no-unused-vars
    STATISTICS = 'STATISTICS',
}

export type userPermissionsType = {
    uid: string;
    AD_MANAGER?: number;
    DOCTOR_AD?: number;
    PATIENT_AD?: number;
    DOCTOR_MEETING?: number;
    STATISTICS?: number;
};

const tableName: string = 'userPermissions';

const UserPermissionsModel = Database.init<userPermissionsType>(tableName, {
    uid: {
        type: DataTypes.CHAR,
        isRequired: true,
        isEncrypted: false,
    },
    AD_MANAGER: {
        type: DataTypes.UNSIGNED,
        isEncrypted: false,
        isRequired: false,
    },
    DOCTOR_AD: {
        type: DataTypes.UNSIGNED,
        isEncrypted: false,
        isRequired: false,
    },
    PATIENT_AD: {
        type: DataTypes.UNSIGNED,
        isEncrypted: false,
        isRequired: false,
    },
    DOCTOR_MEETING: {
        type: DataTypes.UNSIGNED,
        isEncrypted: false,
        isRequired: false,
    },
    STATISTICS: {
        type: DataTypes.UNSIGNED,
        isEncrypted: false,
        isRequired: false,
    },
});

export default UserPermissionsModel;
