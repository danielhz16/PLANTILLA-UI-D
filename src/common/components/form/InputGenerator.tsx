import { TextField, FormControl, FormHelperText, Typography } from "@mui/material";
import type { Input, InputTypes } from "../ts/form";
import { InputPhone } from "./inputs/InputPhone";
import { MainSelect } from "./inputs/Select";



interface Props {
    input: Input,
    field: any,
    error: {
        message?: string
    }
}


const mapInputs: Record<InputTypes, { component: any, props: any }> = {
    text: {
        component: TextField,
        props: {
            type: 'text',
        }
    },
    number: {
        component: TextField,
        props: {
            type: 'number'
        }
    },
    password: {
        component: TextField,
        props: {
            type: 'password'
        }
    },
    phone: {
        component: InputPhone,
        props: {
            type: 'phone'
        }
    },
    email: {
        component: TextField,
        props: {
            type: 'email'
        }
    },
    textarea: {
        component: TextField,
        props: {
            multiline: true,
            rows: 4
        }
    },
    area: {
        component: TextField,
        props: {
            multiline: true,
            rows: 4
        }
    },
    select: {
        component: MainSelect,
        props: {

        }
    },
    group: {
        component: undefined,
        props: undefined
    },
    checkbox: {
        component: undefined,
        props: undefined
    },
    date: {
        component: undefined,
        props: undefined
    }
}

export const InputGenerator: React.FC<Props> = ({ input, field, error }) => {
    const { component: Component, props, ...rest } = mapInputs[input.type];
    const { name, label, disabled, options, type, validations, md, value, fields, handleChange, ...inputRest } = input;

    if (!Component) return <></>;

    return (
        <FormControl fullWidth error={!!error} margin="normal" sx={{ gap: 0.5 }}>
            {label && (
                <Typography
                    variant="caption"
                    sx={{
                        fontWeight: 600,
                        color: 'var(--color-text)',
                        opacity: 0.8,
                        ml: 0.5,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05rem'
                    }}
                >
                    {label}
                </Typography>
            )}
            <Component
                {...props}
                {...field}
                id={name}
                disabled={disabled}
                options={options}
                handleChange={handleChange || field.onChange}
                {...inputRest}
                {...rest}
                variant="outlined"
                fullWidth
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '16px',
                        color: 'var(--color-text)',
                        backgroundColor: 'var(--color-sidebar)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        border: '1px solid var(--color-border)',
                        '&:hover': {
                            backgroundColor: 'var(--color-hover)',
                            borderColor: 'var(--color-primary)',
                            transform: 'translateY(-1px)',
                        },
                        '&.Mui-focused': {
                            backgroundColor: 'var(--color-sidebar)',
                            boxShadow: '0 8px 16px -4px rgba(59, 130, 246, 0.15)',
                            borderColor: 'var(--color-primary)',
                        },
                        '& fieldset': {
                            border: 'none',
                        },
                    },
                    '& .MuiInputBase-input': {
                        padding: '12px 16px',
                        fontSize: '1rem',
                        fontWeight: 500
                    }
                }}
            />
            {error?.message && <FormHelperText sx={{ ml: 1, color: 'var(--color-error)', fontWeight: 500 }}>{error?.message}</FormHelperText>}
        </FormControl>
    )
}