import type { Input } from "@/components/types/form"
import { VALIDATIONS } from "@/const/validations"

export const inputs: Input[] = [
    {
        name: 'username',
        type: 'text',
        label: 'Usuario',
        validations: [{ type: VALIDATIONS.REQUIRED }]
    }
]