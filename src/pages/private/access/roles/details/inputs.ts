import type { Input } from "@/ui/ts/form";
import { VALIDATIONS } from "@/const/validations";

export const inputsRoles: Input[] = [
    {
        label: 'Nombre',
        name: 'name',
        type: 'text',
        validations: [
            { type: VALIDATIONS.REQUIRED },
            { type: VALIDATIONS.MAX_LENGTH, value: 75 }
        ]
    },
    {
        label: 'Descripción',
        name: 'description',
        type: 'area',
        validations: [
            { type: VALIDATIONS.REQUIRED },
            { type: VALIDATIONS.MAX_LENGTH, value: 250 }
        ]
    }
];
