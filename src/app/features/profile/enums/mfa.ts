export const TypeMfa = {
  AuthenticatorApp: 1,
  Email: 2,
  WhatsApp: 3
} as const;

export const MFA_BACKEND_KEYS: Record<number, string> = {
  [TypeMfa.AuthenticatorApp]: 'authenticator',
  [TypeMfa.Email]: 'email',
  [TypeMfa.WhatsApp]: 'wp',
};