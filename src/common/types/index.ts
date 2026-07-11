import { TYPES_AUTHORIZATIONS } from './../const/auth';
import type { Auth } from "@/const/auth"

interface CommonColumns {
    id: number,
    createdAt: Date,
    name: string,
    status: number
}

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

export interface RefForm {
    save: () => void
};


export interface Company extends CommonColumns {
    bpCode: string;
}



export interface Options {
    id: number,
    label: string
}

export interface PropsColumns {
    cacheKey: string
}
export type TypeAuth = typeof TYPES_AUTHORIZATIONS[keyof typeof TYPES_AUTHORIZATIONS];