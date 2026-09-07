import { Box, Typography } from "@mui/material";
import { MainCard } from "./MainCard";
import type { ElementType } from "react";

interface Props {
    label: string;
    value: string;
    icon: ElementType<{ size?: number }>;
    colorToken?: string;
}

export const InfoCard = ({ label, value, icon: Icon, colorToken }: Props) => (
    <MainCard sx={{ height: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
                sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colorToken ? `var(--color-${colorToken}Soft)` : 'var(--color-primarySoft)',
                    color: colorToken ? `var(--color-${colorToken})` : 'var(--color-primary)',
                    flexShrink: 0,
                }}
            >
                <Icon size={18} />
            </Box>
            <Box sx={{ minWidth: 0 }}>
                <Typography
                    variant="caption"
                    sx={{
                        color: 'var(--color-text)',
                        opacity: 0.6,
                        fontWeight: 500,
                        fontSize: '0.7rem',
                        display: 'block',
                        lineHeight: 1.4,
                    }}
                >
                    {label}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: 'var(--color-text)',
                        fontWeight: 500,
                        fontSize: '0.9rem',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                    title={value}
                >
                    {value}
                </Typography>
            </Box>
        </Box>
    </MainCard>
);
