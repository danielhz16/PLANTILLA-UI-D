import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router";
import { Lock, Home } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

const Unauthorized = () => {
    const navigate = useNavigate();
    const { isDark } = useTheme();

    return (
        <Box
            sx={{
                minHeight: '100vh',
                width: '100vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--color-background)',
                backgroundImage: isDark
                    ? `
                    radial-gradient(at 0% 0%, rgba(59, 130, 246, 0.15) 0px, transparent 50%), 
                    radial-gradient(at 100% 100%, rgba(139, 92, 246, 0.15) 0px, transparent 50%)
                `
                    : `
                    radial-gradient(at 0% 0%, rgba(59, 130, 246, 0.05) 0px, transparent 50%), 
                    radial-gradient(at 100% 100%, rgba(139, 92, 246, 0.05) 0px, transparent 50%)
                `,
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 1000,
                p: 2
            }}
        >
            <Container maxWidth="sm">
                <Box
                    sx={{
                        textAlign: 'center',
                        p: 5,
                        borderRadius: '24px',
                        background: 'var(--color-background)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid var(--color-border)',
                        boxShadow: 'var(--color-shadowElevated)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 3,
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '4px',
                            background: 'linear-gradient(90deg, var(--color-error), var(--color-warning))',
                        }
                    }}
                >
                    <Box
                        sx={{
                            width: 80,
                            height: 80,
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, var(--color-errorSoft), var(--color-warningSoft))',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 2
                        }}
                    >
                        <Lock size={40} color="var(--color-error)" />
                    </Box>

                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 900,
                            background: 'linear-gradient(135deg, var(--color-error), var(--color-warning))',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            letterSpacing: '-0.05em',
                            mb: 1
                        }}
                    >
                        403
                    </Typography>

                    <Typography
                        variant="h5"
                        sx={{
                            color: 'var(--color-text)',
                            fontWeight: 600,
                            mb: 1
                        }}
                    >
                        Acceso No Autorizado
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            color: 'var(--color-text)',
                            opacity: 0.7,
                            maxWidth: 400,
                            mb: 2
                        }}
                    >
                        No tienes los permisos necesarios para acceder a este recurso.
                        Si crees que esto es un error, contacta al administrador del sistema.
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
                        <Button
                            variant="contained"
                            startIcon={<Home size={18} />}
                            onClick={() => navigate('/')}
                            sx={{
                                borderRadius: '16px',
                                textTransform: 'none',
                                px: 3,
                                py: 1.2,
                                fontWeight: 600,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: 'var(--color-buttonHoverShadow)',
                                }
                            }}
                        >
                            Ir al Dashboard
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => navigate(-1)}
                            sx={{
                                borderRadius: '16px',
                                textTransform: 'none',
                                px: 3,
                                py: 1.2,
                                fontWeight: 600,
                                borderColor: 'var(--color-border)',
                                color: 'var(--color-text)',
                                '&:hover': {
                                    borderColor: 'var(--color-primary)',
                                    backgroundColor: 'var(--color-hover)',
                                }
                            }}
                        >
                            Volver
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Unauthorized;
