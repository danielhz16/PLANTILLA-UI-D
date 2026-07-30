import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import { Sun, Moon } from 'lucide-react';
import { Box } from '@mui/material';

export const ThemeToggle: React.FC = () => {
    const { isDark, toggleTheme } = useTheme();

    return (
        <Box
            component="button"
            onClick={toggleTheme}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 44,
                height: 44,
                borderRadius: '12px',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-sidebar)',
                backdropFilter: 'blur(20px)',
                color: 'var(--color-text)',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '12px',
                    padding: '1px',
                    background: 'var(--color-toggleBorderGlow)',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                },
                '&:hover': {
                    backgroundColor: 'var(--color-hover)',
                    borderColor: 'var(--color-primary)',
                    transform: 'translateY(-2px)',
                    boxShadow: 'var(--color-toggleHoverShadow)',
                    '&::before': {
                        opacity: 1,
                    },
                    '& svg': {
                        transform: 'rotate(15deg) scale(1.1)',
                    },
                },
                '&:active': {
                    transform: 'translateY(0px)',
                },
                '& svg': {
                    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    filter: 'var(--color-toggleIconShadow)',
                },
            }}
            title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </Box>
    );
};

export default ThemeToggle;
