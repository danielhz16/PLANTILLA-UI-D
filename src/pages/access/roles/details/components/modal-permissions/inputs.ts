import type { Input } from "@/components/types/form";
import type { Options } from "@/shared";

export const inputs = (permissionsOptions: Options[]): Input[] => [
    {
        label: 'Permiso',
        name: 'permission',
        type: 'select',
        options: permissionsOptions,
        validations: [
            { type: 'required' }
        ]
    }
];
