
import type { ValidationType } from "../../const/validations"


export type InputTypes = 'group' | 'text' | 'number' | 'select' | 'phone' | 'email' | 'textarea' | 'area' | 'password' | 'checkbox' | 'date'

export interface Validations {
    type: ValidationType;
    msg?: string;
    value?: any;
}

interface BaseInput {
    name: string;
    label: string;
    type: InputTypes;
    value?: number | string | boolean | null;
    validations?: Validations[];
    md?: number;
    disabled?: boolean;
    options?: { id: string | number; label: string }[];
    clearable?: boolean;
    toNumber?: boolean;
    onChange?: (e: any) => void;
    handleChange?: (value: any) => void;
    defaultValue?: number | string | boolean | null
}

export interface Input extends BaseInput {
    fields?: Input[];
}

