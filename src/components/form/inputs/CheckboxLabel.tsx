import { Box, Switch, Typography } from "@mui/material"
import type { FC } from "react";

interface CheckboxLabelProps {
    label: string;
    description: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}

export const CheckboxLabel: FC<CheckboxLabelProps> = ({ label, description, checked, onChange }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, py: 1 }}>
            <Box sx={{ minWidth: 0 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'var(--color-text)' }}>
                    {label}
                </Typography>
                <Typography variant="body2" sx={{ color: 'var(--color-text)', opacity: 0.7 }}>
                    {description}
                </Typography>
            </Box>
            <Switch checked={checked} onChange={(e) => onChange(e.target.checked)} />
        </Box>
    )
};










