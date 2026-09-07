import React from 'react';
import { Outlet } from 'react-router';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Box } from '@mui/material';

const MainLayout: React.FC = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                minHeight: '100vh',
                width: '100%',
                background: 'var(--color-background)',
                backgroundImage: `radial-gradient(ellipse at 0% 0%, var(--color-gradientBgPrimary) 0px, transparent 55%),
                    radial-gradient(ellipse at 100% 0%, var(--color-gradientBgSecondary) 0px, transparent 55%),
                    radial-gradient(ellipse at 50% 100%, var(--color-gradientBgTertiary) 0px, transparent 50%)`,
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
