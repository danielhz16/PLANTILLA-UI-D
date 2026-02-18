import React from 'react';
import {
    Home,
    Users,
    BarChart,
    Settings,
    FlaskConical
} from 'lucide-react';

export interface MenuItem {
    icon: React.ReactNode;
    label: string;
    path: string;
    roles?: string[];
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
        icon: <BarChart size={20} />,
        label: 'Reports',
        path: '/reports',
    },
    {
        icon: <Settings size={20} />,
        label: 'Settings',
        path: '/settings',
    },
    {
        icon: <FlaskConical size={20} />,
        label: 'Demo',
        path: '/demo',
    },
];
