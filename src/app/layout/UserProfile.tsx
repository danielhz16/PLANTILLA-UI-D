import React, { useState } from 'react';
import { Box, Typography, Menu, MenuItem, Divider } from '@mui/material';
import { LogOut, Settings, User, ChevronDown } from 'lucide-react';
import { useAuthStore } from '@/features/auth';
import { useNavigate } from 'react-router';
import { useMutationQuery } from '@/hooks/api/useMutationQuery';
import { UserAvatar } from '@/components/avatar/UserAvatar';

export const UserProfile: React.FC = () => {
    const { user, logoutUser } = useAuthStore();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const logout = useMutationQuery({ url: 'auth/logout', method: 'POST' });

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        handleClose();
        try {
            await logout.mutateAsync(null);
        } catch {
            // Error ya manejado por el interceptor
        }
        logoutUser();
        navigate('/auth/login');
    };

    const handleSettings = () => {
        handleClose();
        navigate('/settings');
    };

    const handleProfile = () => {
        handleClose();
        navigate('/profile');
    };

    if (!user) return null;

    return (
        <>
            <Box
                onClick={handleClick}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    cursor: 'pointer',
                    p: 1,
                    borderRadius: '12px',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                        backgroundColor: 'var(--color-hover)',
                    }
                }}
            >
                <UserAvatar name={user.fullName} size={40} fontSize="0.9rem" sx={{ border: '2px solid var(--color-border)' }} />
                <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: 600,
                            color: 'var(--color-text)',
                            lineHeight: 1.2,
                        }}
                    >
                        {user.fullName}
                    </Typography>
                    <Typography
                        variant="caption"
                        sx={{
                            color: 'var(--color-text)',
                            opacity: 0.7,
                            fontSize: '0.75rem',
                        }}
                    >
                        {user.email}
                    </Typography>
                </Box>
                <ChevronDown
                    size={18}
                    style={{
                        color: 'var(--color-text)',
                        opacity: 0.7,
                        transition: 'transform 0.2s ease',
                        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                />
            </Box>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                PaperProps={{
                    sx: {
                        mt: 1,
                        minWidth: 220,
                        borderRadius: '16px',
                        border: '1px solid var(--color-border)',
                        backgroundColor: 'var(--color-background)',
                        backdropFilter: 'blur(20px)',
                        boxShadow: '0 10px 40px var(--color-shadowElevated)',
                        overflow: 'hidden',
                    }
                }}
            >
                <Box sx={{ p: 2, pb: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <UserAvatar name={user.fullName} size={48} fontSize="1.1rem" />
                        <Box>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontWeight: 600,
                                    color: 'var(--color-text)',
                                }}
                            >
                                {user.fullName}
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{
                                    color: 'var(--color-text)',
                                    opacity: 0.7,
                                    fontSize: '0.75rem',
                                }}
                            >
                                {user.email}
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Divider sx={{ borderColor: 'var(--color-border)' }} />

                <MenuItem
                    onClick={handleProfile}
                    sx={{
                        py: 1.5,
                        px: 2,
                        gap: 1.5,
                        color: 'var(--color-text)',
                        '&:hover': {
                            backgroundColor: 'var(--color-hover)',
                        }
                    }}
                >
                    <User size={18} />
                    <Typography variant="body2">Perfil</Typography>
                </MenuItem>

                <MenuItem
                    onClick={handleSettings}
                    sx={{
                        py: 1.5,
                        px: 2,
                        gap: 1.5,
                        color: 'var(--color-text)',
                        '&:hover': {
                            backgroundColor: 'var(--color-hover)',
                        }
                    }}
                >
                    <Settings size={18} />
                    <Typography variant="body2">Configuración</Typography>
                </MenuItem>

                <Divider sx={{ borderColor: 'var(--color-border)' }} />

                <MenuItem
                    onClick={handleLogout}
                    sx={{
                        py: 1.5,
                        px: 2,
                        gap: 1.5,
                        color: 'var(--color-error)',
                        '&:hover': {
                            backgroundColor: 'var(--color-logoutHoverBg)',
                        }
                    }}
                >
                    <LogOut size={18} />
                    <Typography variant="body2">Cerrar sesión</Typography>
                </MenuItem>
            </Menu>
        </>
    );
};

export default UserProfile;
