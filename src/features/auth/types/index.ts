import { TYPES_AUTHORIZATIONS, type Auth } from '../const/auth';

export interface UserProfile {
    id: number,
    fullName: string,
    email: string,
    firstLogin: boolean,
    phone: string,
    mfaOk: boolean,
    permissions: Permission[]
};

export interface Permission {
    name: string,
    type: Auth
}

export interface ResponseLogin {
    user: UserProfile,
    show: string,
    mfaOk: boolean,
};

export type TypeAuth = typeof TYPES_AUTHORIZATIONS[keyof typeof TYPES_AUTHORIZATIONS];
