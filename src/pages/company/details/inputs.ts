import type { Input } from "@/components/types/form";
import { VALIDATIONS } from "@/const/validations";

export const inputsCompany: Input[] = [
    {
        label: 'Nombre',
        name: 'name',
        type: 'text',
        validations: [
            {type: VALIDATIONS.REQUIRED},
            {type: VALIDATIONS.MAX_LENGTH, value: 75}
        ]
    },
    {
        label: 'NIT',
        name: 'nit',
        type: 'text',
        validations: [
            {type: VALIDATIONS.REQUIRED},
            {type: VALIDATIONS.MAX_LENGTH, value: 30}
        ]
    }
]