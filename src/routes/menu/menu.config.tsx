import React from 'react';
import {
    Home, Users, Building2, FlaskConical,
    UserRoundKey, Shield, Microscope, Stethoscope, Hospital, HeartPulse,
} from 'lucide-react';
import { TYPES_AUTHORIZATIONS } from '@/common';

export interface MenuItem {
    icon: React.ReactNode;
    label: string;
    path?: string;
    permission?: string;
    level?: typeof TYPES_AUTHORIZATIONS[keyof typeof TYPES_AUTHORIZATIONS];
    children?: MenuItem[];
}

export const menuConfig: MenuItem[] = [
    { icon: <Home size={20} />, label: 'Dashboard', path: '/dashboard' },
    {
        icon: <Users size={20} />, label: 'Gestión usuarios',
        children: [
            { icon: <Users size={20} />, label: 'Usuarios', path: '/gestion-usuarios/usuarios/list', permission: 'GESTION_USUARIOS', level: TYPES_AUTHORIZATIONS.Read },
            { icon: <Shield size={20} />, label: 'Permisos', path: '/gestion-usuarios/permisos/list', permission: 'GESTION_PERMISOS', level: TYPES_AUTHORIZATIONS.Read },
            { icon: <UserRoundKey size={20} />, label: 'Roles', path: '/gestion-usuarios/roles/list', permission: 'GESTION_ROLES', level: TYPES_AUTHORIZATIONS.Read },
        ]
    },
    {
        icon: <Building2 size={20} />, label: 'Clientes',
        children: [
            { icon: <Building2 size={20} />, label: 'Clientes', path: '/clientes/list', permission: 'GESTION_CLIENTES', level: TYPES_AUTHORIZATIONS.Read },
            { icon: <Users size={20} />, label: 'Usuarios Cliente', path: '/clientes/usuarios/list', permission: 'GESTION_CLIENTES', level: TYPES_AUTHORIZATIONS.Read },
            { icon: <Shield size={20} />, label: 'Permisos Cliente', path: '/clientes/permisos/list', permission: 'GESTION_CLIENTES', level: TYPES_AUTHORIZATIONS.Read },
            { icon: <UserRoundKey size={20} />, label: 'Roles Cliente', path: '/clientes/roles/list', permission: 'GESTION_CLIENTES', level: TYPES_AUTHORIZATIONS.Read },
        ]
    },
    {
        icon: <HeartPulse size={20} />, label: 'Pacientes',
        children: [
            { icon: <Users size={20} />, label: 'Usuarios Paciente', path: '/pacientes/usuarios/list' },
        ]
    },
    { icon: <FlaskConical size={20} />, label: 'Demo', path: '/demo' },
    { icon: <Microscope size={20} />, label: 'Laboratorio', path: '/laboratorio' },
    { icon: <Stethoscope size={20} />, label: 'Clínica', path: '/clinica' },
    { icon: <Hospital size={20} />, label: 'Hospital', path: '/hospital' },
];
