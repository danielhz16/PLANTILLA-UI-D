import { forwardRef, useImperativeHandle } from "react";
import {
  useForm,
  Controller,
  useWatch,
  type FieldValues
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box } from "@mui/material";

import { useValidations } from "./hooks/useForm";
import { InputGenerator } from "./InputGenerator";
import { Preview } from "../loading/Preview";
import type { Input } from "../ts/form";

interface Props {
  inputs: Input[];
  onSubmit: (data: any) => void;
  rows?: number;
  columns?: number;
  isLoading?: boolean;
  disabled?: boolean;
  valuesWatch?: string[];
  handleWatch?: (values: any, name?: string) => void;
  sx?: any;
  sxForm?: any;
  sxDesktop?: any;
  defaultValues?: FieldValues;
}

const renderControlledInput = (
  input: Input,
  fieldKey: string,
  control: any,
  errors: any,
  isLoading: boolean
) => (
  <Preview
    key={fieldKey}
    loading={isLoading}
    width="100%"
    height={15}
    radius={5}
  >
    <Controller
      name={input.name}
      control={control}
      defaultValue={input.defaultValue}
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
  handleWatch,
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
  } = useForm<Record<string, any>>({
    resolver: yupResolver(yupSchema) as any,
    mode: "onChange",
    defaultValues: inputs.reduce(
      (acc, input) => ({
        ...acc,
        [input.name]: input.value
      }),
      {}
    ),
    values: defaultValues
  });


const watchedValues = useWatch<Record<string, any>>({
  control,
  name: valuesWatch as readonly string[]
});

  if (handleWatch) {
    handleWatch(watchedValues);
  }

 
  useImperativeHandle(ref, () => ({
    save: () => handleSubmit(onSubmit)(),
    getValues,
    getValue: (name?: string) => name && getValues(name),
    setValue,
    reset,
    watch,
    trigger
  }));


  if (disabled) {
    inputs.forEach(i => {
      i.disabled = true;
    });
  }

  const hasMd = inputs.some(i => i.md);

  const gridColumns =
    typeof columns === "number"
      ? `repeat(${columns}, minmax(0, 1fr))`
      : hasMd
        ? "repeat(12, 1fr)"
        : "repeat(auto-fit, minmax(200px, 1fr))";

  const gridRows =
    typeof rows === "number"
      ? `repeat(${rows}, auto)`
      : "auto";


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ width: "100%", position: "relative" }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: gridColumns,
          gridTemplateRows: gridRows,
          gap: 2,
          width: "100%",
          ...sx,
          "@media (min-width:960px)": sxDesktop,
          ...sxForm
        }}
      >
        {inputs.map((input, index) => {
          const keyBase = `${input.name}-${index}`;

          const gridColumnStyle = input.md
            ? {
                gridColumn: {
                  xs: "span 12",
                  md: `span ${input.md}`
                }
              }
            : {};

          if (input.type === "group") {
            const groupColumns =
              input.fields?.length
                ? `repeat(${input.fields.length}, minmax(0, 1fr))`
                : "repeat(auto-fit, minmax(100px, 1fr))";

            return (
              <Box
                key={keyBase}
                sx={{
                  display: "grid",
                  gridTemplateColumns: groupColumns,
                  gap: 1,
                  ...gridColumnStyle
                }}
              >
                {input.fields?.map((field, subIndex) => (
                  <Box key={`${field.name}-${subIndex}`}>
                    {renderControlledInput(
                      field,
                      `${field.name}-${subIndex}`,
                      control,
                      errors,
                      isLoading
                    )}
                  </Box>
                ))}
              </Box>
            );
          }

          return (
            <Box key={keyBase} sx={gridColumnStyle}>
              {renderControlledInput(
                input,
                keyBase,
                control,
                errors,
                isLoading
              )}
            </Box>
          );
        })}
      </Box>
      <button type="submit" style={{ display: "none" }} />
    </form>
  );
});

export default MainForm;