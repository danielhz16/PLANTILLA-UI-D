import { Box, Stack, Typography } from "@mui/material";
import { INFO_SYSTEM } from "@/conf/info.system";

interface AuthLayoutProps {
    subtitle?: string;
    children: React.ReactNode;
}

const AuthLayout = ({ subtitle, children }: AuthLayoutProps) => {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                width: '100vw',
                display: 'flex',
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 1000,
                userSelect: 'none',
            }}
        >
            {/* Panel izquierdo — marca */}
            <Box
                sx={{
                    display: { xs: 'none', md: 'flex' },
                    flex: '0 0 45%',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 3,
                    background: 'linear-gradient(160deg, #2563eb 0%, #1a3ea8 55%, #1230a0 100%)',
                    p: 6,
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <Box sx={{
                    position: 'absolute', width: 420, height: 420, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.05)', top: -120, right: -140, pointerEvents: 'none'
                }} />
                <Box sx={{
                    position: 'absolute', width: 280, height: 280, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.06)', bottom: -80, left: -80, pointerEvents: 'none'
                }} />

                <Stack alignItems="center" gap={3} sx={{ position: 'relative', zIndex: 1 }}>
                    {INFO_SYSTEM.fulllogo && (
                        <Box
                            component="img"
                            src={INFO_SYSTEM.fulllogo}
                            alt={INFO_SYSTEM.name}
                            sx={{
                                width: '100%',
                                maxWidth: 220,
                                objectFit: 'contain',
                                filter: 'brightness(0) invert(1)',
                            }}
                        />
                    )}
                    <Typography
                        variant="h5"
                        sx={{ color: '#ffffff', fontWeight: 700, textAlign: 'center', letterSpacing: 0.3 }}
                    >
                        {INFO_SYSTEM.description}
                    </Typography>
                    {subtitle && (
                        <Typography
                            variant="body2"
                            sx={{ color: 'rgba(255,255,255,0.65)', textAlign: 'center', maxWidth: 280, lineHeight: 1.7 }}
                        >
                            {subtitle}
                        </Typography>
                    )}
                </Stack>
            </Box>

            {/* Panel derecho — contenido */}
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: 'var(--color-background)',
                    p: { xs: 3, sm: 6 },
                }}
            >
                {/* Logo solo en mobile */}
                <Box sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'center', mb: 4 }}>
                    {INFO_SYSTEM.fulllogo && (
                        <Box
                            component="img"
                            src={INFO_SYSTEM.fulllogo}
                            alt={INFO_SYSTEM.name}
                            sx={{ width: 160, objectFit: 'contain' }}
                        />
                    )}
                </Box>

                <Box sx={{ width: '100%', maxWidth: 380 }}>
                    {children}
                </Box>
            </Box>
        </Box>
    );
};

export default AuthLayout;
