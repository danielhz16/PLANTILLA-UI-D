import type { Input } from "@/components/ts/form";
import { type Options, AUTH_OPTIONS } from "@/common";

export const inputs = (users: Options[] = []): Input[] => {
    return [
        {
            name: 'user',
            label: 'Usuario',
            type: 'select',
            options: users
        },
        {
            name: 'auth',
            label: 'Nivel de autorización',
            type: 'select',
            options: AUTH_OPTIONS
        }
    ]
}