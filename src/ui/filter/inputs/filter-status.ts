import { optionsStatus, STATUS } from "@/const/status";
import type { Input } from "@/ui/ts/form";

export const filterStatus = (): Input[] => [
    {
        name: 'status_id',
        label: 'Estado',
        type: 'select',
        md: 12,
        options: optionsStatus
    }
];


export const defaultInitial = {
    status_id: STATUS.ACTIVE,
    status: STATUS.ACTIVE
}