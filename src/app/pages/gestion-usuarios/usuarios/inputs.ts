import { Input, f } from '@shared/types/form';

export const inputsUser = (roles: { id: number; label: string }[]): Input[] => [
  f.text('username').label('Nombre de usuario').md(12).required('El nombre de usuario es obligatorio').build(),
  f.text('firstname').label('Nombres').md(6).required('El nombre es obligatorio').build(),
  f.text('lastname').label('Apellidos').md(6).required('El apellido es obligatorio').build(),
  f.email('email').label('Correo electrónico').md(6).required('El correo es obligatorio').email().build(),
  f.phone('phone').label('Teléfono').md(6).required('El teléfono es obligatorio').build(),
  f.select('role', roles).label('Rol').md(6).required('El rol es obligatorio').build(),
];