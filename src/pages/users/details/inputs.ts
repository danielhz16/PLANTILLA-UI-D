import { filterStatus } from "@/components";
import { type Options } from "@/shared";
import type { Input } from "@/components/types/form";
import { VALIDATIONS } from "@/const/validations";

export const inputsUser = ({ roles }: { roles: Options[] }): Input[] => [
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
    },
    {
        name: 'role',
        label: 'Rol',
        type: 'select',
        md: 6,
        options: roles,
        validations: [
            { type: VALIDATIONS.REQUIRED, msg: 'El rol es obligatorio' }
        ]
    }
];


export const filters = (companies: Options[]): Input[] => [
    {
        name: 'company',
        label: 'Empresa',
        type: 'select',
        md: 12,
        options: companies
    },
    ...filterStatus()
]
