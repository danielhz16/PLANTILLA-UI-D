import React from 'react';
import {
    Home, Users, Building2, FlaskConical,
    UserRoundKey, Shield, Microscope, Stethoscope, Hospital,
} from 'lucide-react';

export interface MenuItem {
    icon: React.ReactNode;
    label: string;
    path?: string;
    roles?: string[];
    children?: MenuItem[];
}

export const menuConfig: MenuItem[] = [
    { icon: <Home size={20} />, label: 'Dashboard', path: '/dashboard' },
    {
        icon: <Users size={20} />, label: 'Gestión usuarios',
        children: [
            { icon: <Users size={20} />, label: 'Usuarios', path: '/gestion-usuarios/usuarios/list' },
            { icon: <Shield size={20} />, label: 'Permisos', path: '/gestion-usuarios/permisos/list' },
            { icon: <UserRoundKey size={20} />, label: 'Roles', path: '/gestion-usuarios/roles/list' },
        ]
    },
    { icon: <Building2 size={20} />, label: 'Clientes', path: '/clientes' },
    { icon: <FlaskConical size={20} />, label: 'Demo', path: '/demo' },
    { icon: <Microscope size={20} />, label: 'Laboratorio', path: '/laboratorio' },
    { icon: <Stethoscope size={20} />, label: 'Clínica', path: '/clinica' },
    { icon: <Hospital size={20} />, label: 'Hospital', path: '/hospital' },
];
