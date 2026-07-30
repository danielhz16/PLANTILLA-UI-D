import type { Input } from "@/ui/ts/form";
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
