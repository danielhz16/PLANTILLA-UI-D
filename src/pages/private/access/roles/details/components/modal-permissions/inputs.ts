import type { Input } from "@/components/ts/form";
import type { Options } from "@/common";

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
