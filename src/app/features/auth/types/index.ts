export interface Permission {
  name: string;
  type: number;
}

export interface UserProfile {
  id: number;
  fullName: string;
  email: string;
  firstLogin: boolean;
  phone: string;
  mfaOk: boolean;
  mfaAuthenticator: boolean | null;
  mfaEmail: boolean | null;
  mfaWp: boolean | null;
  permissions: Permission[];
}

export interface ResponseLogin {
  user: UserProfile;
  show: string;
  mfaOk: boolean;
}

export enum TypeMfa {
  AuthenticatorApp = 1,
  Email = 2,
  WhatsApp = 3
}

export interface MfaOptions {
  mfaAuthenticator: boolean | null;
  mfaEmail: boolean | null;
  mfaWp: boolean | null;
}

export interface PendingLogin {
  email: string;
  password?: string;
  options?: MfaOptions;
}
