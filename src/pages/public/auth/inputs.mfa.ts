import type { Input } from "@/components/types/form";
import { VALIDATIONS } from "@/const/validations";

export const inputs: Input[] = [
    {
        name: 'code',
        type: 'text',
        label: 'Código de verificación',
        validations: [
            { type: VALIDATIONS.REQUIRED },
            { type: VALIDATIONS.MIN_LENGTH, value: 6 },
            { type: VALIDATIONS.MAX_LENGTH, value: 6 }
        ],
        inputProps: {
            inputMode: 'numeric',
            pattern: '[0-9]*',
            maxLength: 6,
            autoComplete: 'one-time-code'
        }
    }
];
