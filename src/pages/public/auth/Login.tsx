import { MainForm } from "@/components/form/MainForm";
import { inputs } from "./inputs";
import { Box, Card, Typography, Container, Button, Divider } from "@mui/material";
import { useLogin } from "./useLogin";
import { useTheme } from "@/hooks/useTheme";
import { INFO_SISTEM } from "@/conf/info.sistem";

const Login = () => {
    const { formRef, handleSubmit, isPending } = useLogin();
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
                p: 2,
                userSelect: 'none'
            }}
        >
            <Container maxWidth="md">
                <Card
                    sx={{
                        p: { xs: 4, md: 0 },
                        borderRadius: '24px',
                        background: 'var(--color-background)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid var(--color-border)',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '4px',
                            background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                        }
                    }}
                >
                    {/* Panel izquierdo: branding y descripción */}
                    <Box
                        sx={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            gap: 2.5,
                            p: { xs: 0, md: 4 },
                            pr: { md: 0 },
                            borderRight: { md: '1px solid var(--color-border)' }
                        }}
                    >
                        {INFO_SISTEM.fulllogo && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: { xs: 'center', md: 'flex-start' },
                                }}
                            >
                                <Box
                                    component="img"
                                    src={INFO_SISTEM.fulllogo}
                                    alt={INFO_SISTEM.name}
                                    sx={{
                                        height: 40,
                                        width: 'auto',
                                        display: 'block',
                                        filter: 'drop-shadow(0 18px 35px rgba(15,23,42,0.35))',
                                    }}
                                />
                            </Box>
                        )}

                        <Typography
                            variant="h6"
                            sx={{
                                color: 'var(--color-text)',
                                opacity: isDark ? 0.9 : 0.8,
                                fontWeight: 600,
                                textAlign: { xs: 'center', md: 'left' }
                            }}
                        >
                            {INFO_SISTEM.loginSubtitle}
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={{
                                color: 'var(--color-text)',
                                opacity: 0.7,
                                maxWidth: 360,
                                textAlign: { xs: 'center', md: 'left' },
                                mx: { xs: 'auto', md: 0 }
                            }}
                        >
                           {INFO_SISTEM.loginHelper}
                        </Typography>
                    </Box>

                    {/* Separador para mobile */}
                    <Divider
                        sx={{
                            my: 2,
                            display: { xs: 'block', md: 'none' },
                            borderColor: 'var(--color-border)'
                        }}
                    />

                    {/* Panel derecho: formulario */}
                    <Box
                        sx={{
                            flex: 1,
                            p: { xs: 0, md: 4 },
                            pt: { xs: 0, md: 4 },
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2
                        }}
                    >
                        <Typography
                            variant="subtitle1"
                            sx={{
                                color: 'var(--color-text)',
                                fontWeight: 600,
                                mb: 1
                            }}
                        >
                            Iniciar sesión
                        </Typography>

                        <MainForm
                            ref={formRef as any}
                            inputs={inputs}
                            onSubmit={handleSubmit}
                            columns={1}
                            sx={{ width: '100%' }}
                            sxForm={{ gap: 1.5 }}
                        />

                        <Button
                            fullWidth
                            variant="contained"
                            onClick={() => formRef.current?.save()}
                            loading={isPending}
                            sx={{
                                mt: 1,
                                py: 1.5,
                                borderRadius: '16px',
                                textTransform: 'none',
                                fontSize: '1rem',
                                fontWeight: 600,
                                letterSpacing: 0.2,
                                transition: 'all 0.3s ease',
                                boxShadow: '0 12px 24px -8px rgba(37, 99, 235, 0.45)',
                                '&:hover': {
                                    transform: 'translateY(-1px)',
                                    boxShadow: '0 18px 32px -10px rgba(37, 99, 235, 0.55)',
                                    opacity: 0.98
                                }
                            }}
                        >
                            Acceder
                        </Button>
                    </Box>
                </Card>
            </Container>
        </Box>
    )
}

export default Login