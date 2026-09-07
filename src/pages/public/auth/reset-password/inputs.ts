import type { Input } from "@/components/types/form";
import { VALIDATIONS } from "@/const/validations";

export const inputs: Input[] = [
    {
        name: "newPassword",
        type: "password",
        label: "Nueva contraseña",
        validations: [{ type: VALIDATIONS.REQUIRED }, { type: VALIDATIONS.MIN_LENGTH, value: 6 }]
    }
];
