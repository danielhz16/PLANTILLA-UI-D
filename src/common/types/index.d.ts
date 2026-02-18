import type { Auth } from "@/const/auth"

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