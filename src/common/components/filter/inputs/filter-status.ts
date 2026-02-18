import { optionsStatus } from "@/const/status";
import type { Input } from "@/components/ts/form";
import  { STATUS, } from "@/const/status";

export const filterStatus = (): Input[] => [
    {
        name: 'status',
        label: 'Estado',
        type: 'select',
        md: 12,
        options: optionsStatus,
        defaultValue:  STATUS.ACTIVE
    }
];
