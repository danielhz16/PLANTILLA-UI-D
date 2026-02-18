import type { Input } from "@/components/ts/form";
import { VALIDATIONS } from "@/const/validations";

export const inputsUser = (): Input[] => [
    {
        name: 'username',
        label: 'Nombre de usuario',
        type: 'text',
        md: 12,
        validations: [
            { type: VALIDATIONS.REQUIRED, msg: 'El nombre de usuario es obligatorio' }
        ]
    },
    {
        name: 'firstname',
        label: 'Nombres',
        type: 'text',
        md: 6,
        validations: [
            { type: VALIDATIONS.REQUIRED, msg: 'El nombre es obligatorio' }
        ]
    },
    {
        name: 'lastname',
        label: 'Apellidos',
        type: 'text',
        md: 6,
        validations: [
            { type: VALIDATIONS.REQUIRED, msg: 'El apellido es obligatorio' }
        ]
    },
    {
        name: 'email',
        label: 'Correo electrónico',
        type: 'email',
        md: 6,
        validations: [
            { type: VALIDATIONS.REQUIRED, msg: 'El correo es obligatorio' },
            { type: VALIDATIONS.EMAIL, msg: 'Ingrese un correo válido' }
        ]
    },
    {
        name: 'phone',
        label: 'Teléfono',
        type: 'phone',
        md: 6,
        validations: [
            { type: VALIDATIONS.REQUIRED, msg: 'El teléfono es obligatorio' }
        ]
    }
];
