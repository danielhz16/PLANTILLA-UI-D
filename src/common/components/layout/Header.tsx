import React from 'react';
import { Box, Typography } from '@mui/material';
import { UserProfile } from './UserProfile';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
    title?: string;
    children?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ title, children }) => {
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
                position: 'sticky',
                top: 0,
                zIndex: 10,
                backdropFilter: 'blur(20px)',
                background: 'var(--color-headerBg)',
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
