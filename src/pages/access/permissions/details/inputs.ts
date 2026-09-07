import type { Input } from "@/components/types/form";
import { VALIDATIONS } from "@/const/validations";



export const inputsPermission: Input[] = [
 {
    label: 'Nombre',
    name: 'name',
    type: 'text',
    validations: [
        { type: VALIDATIONS.REQUIRED },
        { type: VALIDATIONS.MAX_LENGTH, value: 50 }
    ]
 },
 {
    label: 'Descripción',
    name: 'description',
    type: 'area',
    validations: [
        { type: VALIDATIONS.REQUIRED },
        { type: VALIDATIONS.MAX_LENGTH, value: 250 },
        { type: VALIDATIONS.MIN_LENGTH, value: 25 }
    ]
 }
]