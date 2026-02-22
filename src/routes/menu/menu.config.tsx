import React from 'react';
import {
    Home,
    Users,
    BarChart,
    Settings,
    FlaskConical,
    Building2,
    UserRoundKey,
    Shield,
} from 'lucide-react';

export interface MenuItem {
    icon: React.ReactNode;
    label: string;
    path?: string;
    roles?: string[];
    children?: MenuItem[];
}

export const menuConfig: MenuItem[] = [
    {
        icon: <Home size={20} />,
        label: 'Dashboard',
        path: '/',
    },
    {
        icon: <Users size={20} />,
        label: 'Users',
        path: '/user/list',
    },
    {
        icon: <Building2 size={20} />,
        label: 'Empresas',
        path: '/company',
    },
    {
        icon: <FlaskConical size={20} />,
        label: 'Demo',
        path: '/demo',
    },
    {
        icon: <UserRoundKey size={20} />,
        label: 'Permisos',
        children: [
            { icon: <Shield size={20} />, label: 'Permisos', path: '/permissions/list' },
            { icon: <Users size={20} />, label: 'Roles', path: '/roles/list' },
        ]
    }
];
