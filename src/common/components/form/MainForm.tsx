import { useForm } from "react-hook-form"
import { useValidations } from "./hooks/useForm"
import type { Input } from "../ts/form"
import { Box } from "@mui/material"
import { yupResolver } from "@hookform/resolvers/yup"
import { InputGenerator } from "./InputGenerator"
import { Controller } from "react-hook-form"
import { Preview } from "../loading/Preview"
import { forwardRef, useImperativeHandle, useEffect } from "react"

interface Props {
    inputs: Input[];
    onSubmit: (data: any) => void;
    rows?: number;
    columns?: number;
    isLoading?: boolean;
    disabled?: boolean;
    valuesWatch?: string[];
    handleWatch?: any;
    sx?: any;
    sxForm?: any;
    sxDesktop?: any;
    defaultValues?: any;
}


const renderControlledInput = (input: Input, fieldKey: string, control: any, errors: any, isLoading: boolean) => (
    <Preview loading={isLoading} width='100%' height={15} radius={5} key={fieldKey}>
        <Controller
            key={fieldKey}
            name={input.name}
            control={control}
            defaultValue={input?.defaultValue}
            
            render={({ field }) => (
                <InputGenerator
                    input={input}
                    field={field}
                    error={errors[input.name]}
                />
            )}
        />
    </Preview>
);



export const MainForm = forwardRef<
    {
        save: () => void;
        getValues: () => any;
        getValue: (fieldName?: string) => any;
        setValue: any;
        reset: any;
        watch: any;
        trigger: any;
    },
    Props
>(({
    inputs = [],
    onSubmit,
    rows,
    columns,
    isLoading = false,
    disabled = false,
    valuesWatch = [],
    handleWatch = null,
    sx = {},
    sxForm = {},
    sxDesktop = {},
    defaultValues
}, ref) => {
    const { yupSchema } = useValidations(inputs);

    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
        setValue,
        watch,
        trigger,
        getValues
    } = useForm<any>({
        resolver: yupResolver(yupSchema),
        mode: "onChange",
        defaultValues: defaultValues ? defaultValues : inputs.reduce((acc, input) => ({ ...acc, [input.name]: input.value }), {}) || {}
    })

    if (disabled) {
        inputs.forEach(i => {
            i.disabled = true
        })
    }

    const hasMd = inputs.some(i => i.md);
    const defaultCols = typeof columns === "number" && columns > 0
        ? `repeat(${columns}, minmax(0, 1fr))`
        : hasMd
            ? "repeat(12, 1fr)"
            : `repeat(auto-fit, minmax(200px, 1fr))`;

    const defaultRows = typeof rows === "number" && rows > 0
        ? `repeat(${rows}, auto)`
        : "auto";

    useImperativeHandle(ref, () => ({
        save: () => handleSubmit(onSubmit)(),
        getValues: () => getValues(),
        getValue: (fieldName?: string) => fieldName && getValues(fieldName),
        setValue,
        reset,
        watch,
        trigger,
    }));

    useEffect(() => {
        if (defaultValues && Object.keys(defaultValues).length > 0) {
            reset(defaultValues);
        }
    }, [defaultValues, reset]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                handleSubmit(onSubmit)()
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        }
    }, [onSubmit, handleSubmit]);

    useEffect(() => {
        if (!handleWatch) return;

        if (!valuesWatch || valuesWatch.length === 0) {
            handleWatch(watch);
            return;
        }

        const subscription = watch((value, { name }) => {
            if (!name) return;
            if (valuesWatch.includes(name)) {
                const selectedArray = valuesWatch.map(k => value ? value[k] : undefined);
                try {
                    handleWatch(selectedArray, name);
                } catch (e) {

                }
            }
        });

        return () => {
            if (subscription && typeof subscription.unsubscribe === "function") subscription.unsubscribe();
        };

    }, [handleWatch, watch, JSON.stringify(valuesWatch)]);


    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ position: "relative", width: "100%", display: "grid", placeItems: "center" }}
        >
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: defaultCols,
                    gridTemplateRows: defaultRows,
                    gap: 2,
                    width: "100%",
                    minWidth: 0,
                    ...sx,
                    "@media (min-width:960px)": sxDesktop,
                    ...sxForm,
                }}
            >
                {inputs.map((input, index) => {
                    const keyBase = `${input.name || 'group'}-${index}`;
                    const gridColumnStyle = input.md
                        ? {
                            gridColumn: {
                                xs: "span 12",
                                md: `span ${input.md}`
                            }
                        }
                        : {};

                    switch (input?.type) {
                        case 'group':
                            {
                                const groupColumns = input?.fields && input.fields.length > 0
                                    ? `repeat(${input.fields.length}, minmax(0, 1fr))`
                                    : `repeat(auto-fit, minmax(100px, 1fr))`;

                                return (
                                    <Box key={keyBase} sx={{ display: "grid", gridTemplateColumns: groupColumns, gap: 1, ...gridColumnStyle }} >
                                        {input?.fields?.map((field, subIndex) => (
                                            <Box key={`${field.name}-${subIndex}`} sx={{}}>
                                                {renderControlledInput(field, `${field.name}-${subIndex}`, control, errors, isLoading)}
                                            </Box>
                                        ))}
                                    </Box>
                                );
                            }
                        default:
                            return (
                                <Box key={keyBase} sx={{ ...gridColumnStyle }}>
                                    {renderControlledInput(input, `${input.name}-${index}`, control, errors, isLoading)}
                                </Box>
                            );
                    }
                })}
            </Box>
        </Box>
    )
})