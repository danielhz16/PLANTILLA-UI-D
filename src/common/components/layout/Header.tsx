import React from 'react';
import { Box, Typography } from '@mui/material';
import { UserProfile } from './UserProfile';
import { useTheme } from '@/hooks/useTheme';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
    title?: string;
    children?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ title, children }) => {
    const { isDark } = useTheme();

    return (
        <Box
            component="header"
            sx={{
                width: '100%',
                p: 2,
                pb: 2.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
                borderBottom: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-background)',
                position: 'sticky',
                top: 0,
                zIndex: 10,
                backdropFilter: 'blur(20px)',
                background: isDark
                    ? 'rgba(15, 23, 42, 0.8)'
                    : 'rgba(248, 250, 252, 0.8)',
            }}
        >
            {/* Sección izquierda: Título o contenido personalizado */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                {title && (
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 700,
                            color: 'var(--color-text)',
                            letterSpacing: '-0.02em',
                        }}
                    >
                        {title}
                    </Typography>
                )}
                {children}
            </Box>

            {/* Sección derecha: Controles y perfil */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                }}
            >
                <ThemeToggle />
                <UserProfile />
            </Box>
        </Box>
    );
};

export default Header;
