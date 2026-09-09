import { RouteNode } from '@routes/types';
import { USERS } from '@features/users';
import { ROLES } from '@features/roles';
import { PERMISSIONS } from '@features/permissions';
import { TYPES_AUTHORIZATIONS } from '@features/auth';

export const MENU_ROUTES: RouteNode[] = [
  {
    name: 'Dashboard',
    route: 'dashboard',
    menuRoute: true,
    icon: 'Home',
  },
  {
    name: 'Gestión usuarios',
    route: 'gestion-usuarios',
    icon: 'Users',
    sub: [
      {
        name: 'Usuarios',
        route: 'usuarios',
        icon: 'Users',
        sub: [
          {
            name: 'Usuarios',
            route: 'list',
            menuRoute: true,
            icon: 'Users',
            auth: [USERS.MODULE, TYPES_AUTHORIZATIONS.Read],
          },
        ],
      },
      {
        name: 'Roles',
        route: 'roles',
        icon: 'UserRoundKey',
        sub: [
          {
            name: 'Roles',
            route: 'list',
            menuRoute: true,
            icon: 'UserRoundKey',
            auth: [ROLES.MODULE, TYPES_AUTHORIZATIONS.Read],
          },
        ],
      },
      {
        name: 'Permisos',
        route: 'permisos',
        icon: 'Shield',
        sub: [
          {
            name: 'Permisos',
            route: 'list',
            menuRoute: true,
            icon: 'Shield',
            auth: [PERMISSIONS.MODULE, TYPES_AUTHORIZATIONS.Read],
          },
        ],
      },
    ],
  },
  {
    name: 'Pacientes',
    route: 'pacientes',
    icon: 'HeartPulse',
    sub: [
      {
        name: 'Usuarios Paciente',
        route: 'usuarios',
        icon: 'Users',
        sub: [
          {
            name: 'Usuarios Paciente',
            route: 'list',
            menuRoute: true,
            icon: 'Users',
          },
        ],
      },
    ],
  },
  {
    name: 'Laboratorio',
    route: 'laboratorio',
    menuRoute: true,
    icon: 'Microscope',
  },
  {
    name: 'Clínica',
    route: 'clinica',
    menuRoute: true,
    icon: 'Stethoscope',
  },
  {
    name: 'Hospital',
    route: 'hospital',
    menuRoute: true,
    icon: 'Hospital',
  },
];