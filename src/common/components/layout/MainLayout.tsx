import React from 'react';
import { Outlet } from 'react-router';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Box } from '@mui/material';
import { useTheme } from '@/hooks/useTheme';

const MainLayout: React.FC = () => {
    const { isDark } = useTheme();

    return (
        <Box
            sx={{
                display: 'flex',
                minHeight: '100vh',
                width: '100%',
                background: 'var(--color-background)',
                backgroundImage: isDark
                    ? `radial-gradient(ellipse at 0% 0%, rgba(96,165,250,0.07) 0px, transparent 55%),
                       radial-gradient(ellipse at 100% 0%, rgba(167,139,250,0.05) 0px, transparent 55%),
                       radial-gradient(ellipse at 50% 100%, rgba(96,165,250,0.03) 0px, transparent 50%)`
                    : `radial-gradient(ellipse at 0% 0%, rgba(59,130,246,0.06) 0px, transparent 50%),
                       radial-gradient(ellipse at 100% 0%, rgba(139,92,246,0.05) 0px, transparent 50%)`,
            }}
        >
            <Sidebar />
            <Box
                component="main"
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                }}
            >
                <Header />
                <Box
                    sx={{
                        flex: 1,
                        p: 4,
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};

export default MainLayout;
