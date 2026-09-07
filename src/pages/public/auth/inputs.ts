import type { Input } from "@/components/types/form";
import { VALIDATIONS } from "@/const/validations";

export const inputs: Input[] = [
        {
            name: "username",
            label: "Usuario",
            type: "text",
            value: "",
            validations: [
                {
                    type: VALIDATIONS.REQUIRED,
                }
            ]
        },
        {
            name: "password",
            label: "Contraseña",
            type: "password",
            value: "",
            validations: [
                {
                    type: VALIDATIONS.REQUIRED,
                }
            ]
        }
    ]
