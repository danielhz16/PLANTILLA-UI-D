import { TypeMfa } from '@features/profile/enums/mfa';

export interface ConfigMfa {
  label: string;
  description: string;
  id: (typeof TypeMfa)[keyof typeof TypeMfa];
  name: string;
  descriptionModal: string;
  descriptionModalDeactivate: string;
}

export const CONFIG_MFA: ConfigMfa[] = [
  {
    name: 'email',
    label: 'Correo electrónico',
    description: 'Recibirás un código de verificación en tu correo electrónico.',
    id: TypeMfa.Email,
    descriptionModal:
      'Te enviaremos un código de verificación a tu dirección de correo electrónico para configurar la verificación en dos pasos.',
    descriptionModalDeactivate:
      'Al desactivar, no recibirás códigos de verificación en tu dirección de correo electrónico. ¿Estás seguro de desactivar la verificación en dos pasos?'
  },
  {
    name: 'whatsapp',
    label: 'WhatsApp',
    description: 'Recibirás un código de verificación en tu WhatsApp.',
    id: TypeMfa.WhatsApp,
    descriptionModal:
      'Te enviaremos un código de verificación a tu número de WhatsApp para configurar la verificación en dos pasos.',
    descriptionModalDeactivate:
      'Al desactivar, no recibirás códigos de verificación en tu WhatsApp. ¿Estás seguro de desactivar la verificación en dos pasos?'
  },
  {
    name: 'authenticator',
    label: 'Autenticador',
    description:
      'Usa una aplicación de autenticación para generar códigos de verificación.',
    id: TypeMfa.AuthenticatorApp,
    descriptionModal:
      'Te proporcionaremos un QR para enlazar tu cuenta con una app de autenticación (Google Authenticator, Microsoft Authenticator, etc).',
    descriptionModalDeactivate:
      'Al desactivar, ya no podrás generar códigos con tu aplicación de autenticación. ¿Estás seguro de desactivar la verificación en dos pasos?'
  }
];