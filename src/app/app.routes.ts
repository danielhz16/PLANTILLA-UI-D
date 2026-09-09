import { Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { PermissionGuard } from '@core/guards/permission.guard';
import { MainLayoutComponent } from '@layout/main-layout.component';
import { USERS } from '@features/users';
import { ROLES } from '@features/roles';
import { PERMISSIONS } from '@features/permissions';
import { TYPES_AUTHORIZATIONS } from '@features/auth';

export const appRoutes: Routes = [
  {
    path: 'auth/login',
    loadComponent: () => import('@pages/public/auth/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'auth/forgot',
    loadComponent: () => import('@pages/public/auth/forgot.component').then((m) => m.ForgotComponent),
  },
  {
    path: 'auth/reset-password/:token',
    loadComponent: () => import('@pages/public/auth/reset-password.component').then((m) => m.ResetPasswordComponent),
  },
  {
    path: 'unauthorized',
    loadComponent: () => import('@pages/public/unauthorized.component').then((m) => m.UnauthorizedComponent),
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivateChild: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('@pages/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'gestion-usuarios/usuarios/list',
        loadComponent: () => import('@pages/gestion-usuarios/usuarios/list-users.component').then((m) => m.ListUsersComponent),
        canActivate: [PermissionGuard],
        data: { permission: USERS.MODULE, level: TYPES_AUTHORIZATIONS.Read },
      },
      {
        path: 'gestion-usuarios/usuarios/create',
        loadComponent: () => import('@pages/gestion-usuarios/usuarios/details-user.component').then((m) => m.DetailsUserComponent),
        canActivate: [PermissionGuard],
        data: { permission: USERS.MODULE, level: TYPES_AUTHORIZATIONS.Write },
      },
      {
        path: 'gestion-usuarios/usuarios/details/:id',
        loadComponent: () => import('@pages/gestion-usuarios/usuarios/details-user.component').then((m) => m.DetailsUserComponent),
        canActivate: [PermissionGuard],
        data: { permission: USERS.MODULE, level: TYPES_AUTHORIZATIONS.Write },
      },
      {
        path: 'gestion-usuarios/roles/list',
        loadComponent: () => import('@pages/gestion-usuarios/roles/list-roles.component').then((m) => m.ListRolesComponent),
        canActivate: [PermissionGuard],
        data: { permission: ROLES.MODULE, level: TYPES_AUTHORIZATIONS.Read },
      },
      {
        path: 'gestion-usuarios/roles/create',
        loadComponent: () => import('@pages/gestion-usuarios/roles/details-roles.component').then((m) => m.DetailsRolesComponent),
        canActivate: [PermissionGuard],
        data: { permission: ROLES.MODULE, level: TYPES_AUTHORIZATIONS.Write },
      },
      {
        path: 'gestion-usuarios/roles/details/:id',
        loadComponent: () => import('@pages/gestion-usuarios/roles/details-roles.component').then((m) => m.DetailsRolesComponent),
        canActivate: [PermissionGuard],
        data: { permission: ROLES.MODULE, level: TYPES_AUTHORIZATIONS.Write },
      },
      {
        path: 'gestion-usuarios/permisos/list',
        loadComponent: () => import('@pages/gestion-usuarios/permisos/list-permissions.component').then((m) => m.ListPermissionsComponent),
        canActivate: [PermissionGuard],
        data: { permission: PERMISSIONS.MODULE, level: TYPES_AUTHORIZATIONS.Read },
      },
      {
        path: 'gestion-usuarios/permisos/create',
        loadComponent: () => import('@pages/gestion-usuarios/permisos/details-permissions.component').then((m) => m.DetailsPermissionsComponent),
        canActivate: [PermissionGuard],
        data: { permission: PERMISSIONS.MODULE, level: TYPES_AUTHORIZATIONS.Write },
      },
      {
        path: 'gestion-usuarios/permisos/details/:id',
        loadComponent: () => import('@pages/gestion-usuarios/permisos/details-permissions.component').then((m) => m.DetailsPermissionsComponent),
        canActivate: [PermissionGuard],
        data: { permission: PERMISSIONS.MODULE, level: TYPES_AUTHORIZATIONS.Write },
      },
      {
        path: 'pacientes/usuarios/list',
        loadComponent: () => import('@pages/shared/module-placeholder.component').then((m) => m.ModulePlaceholderComponent),
        data: { icon: 'HeartPulse', label: 'Usuarios Paciente' },
      },
      {
        path: 'laboratorio',
        loadComponent: () => import('@pages/placeholders/laboratory.component').then((m) => m.LaboratoryComponent),
      },
      {
        path: 'clinica',
        loadComponent: () => import('@pages/placeholders/clinic.component').then((m) => m.ClinicComponent),
      },
      {
        path: 'hospital',
        loadComponent: () => import('@pages/placeholders/hospital.component').then((m) => m.HospitalComponent),
      },
      {
        path: 'profile',
        loadComponent: () => import('@pages/profile/profile.component').then((m) => m.ProfileComponent),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];