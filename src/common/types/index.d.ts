import type { Auth } from "@/const/auth"

interface CommonColumns {
    id: number,
    createdAt: Date,
    name: string,
    status: number
}

export interface UserProfile {
    name: string,
    email: string,
    id: number,
    firstLogin: boolean,
    username: string
};

export type Permissions = Auth[];

export interface ResponseLogin {
    user: UserProfile,
    permissions: Permissions
};

export interface RefForm {
 save: () => void
};


export interface Company extends CommonColumns {
  bpCode: string;
}


export interface Permission extends CommonColumns{
}

export interface Options {
    id: number,
    label: string
}