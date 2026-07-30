import type { DetailField } from '@/common/types/details';
import { User, AtSign, Mail, Phone } from 'lucide-react';

export const userDetailFields: DetailField[] = [
    { label: 'Nombres', name: 'firstname', icon: User },
    { label: 'Apellidos', name: 'lastname', icon: User },
    { label: 'Nombre de usuario', name: 'username', icon: AtSign },
    { label: 'Correo electrónico', name: 'email', icon: Mail },
    { label: 'Teléfono', name: 'phone', icon: Phone },
];
