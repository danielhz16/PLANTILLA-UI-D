import { MainForm } from "@/ui/form/MainForm";
import { inputs } from "./inputs";
import { Typography, Button, Stack } from "@mui/material";
import { useLogin } from "./useLogin";
import AuthLayout from "./AuthLayout";
import { MfaModal } from "./MfaModal";

const Login = () => {
    const { formRef, handleSubmit, isPending, toForgot, openMfa, pendingLogin, handleCloseMfa } = useLogin();

    return (
        <>
            <AuthLayout subtitle="Ingresa tus credenciales para acceder">
                <Stack gap={0.5} mb={4}>
                    <Typography
                        variant="h5"
                        sx={{ fontWeight: 800, color: 'var(--color-text)', letterSpacing: -0.3 }}
                    >
                        Iniciar sesión
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ color: 'var(--color-text)', opacity: 0.55 }}
                    >
                        Accede con tu usuario y contraseña
                    </Typography>
                </Stack>

                <MainForm
                    ref={formRef as any}
                    inputs={inputs}
                    onSubmit={handleSubmit}
                    columns={1}
                    sx={{ width: '100%' }}
                    sxForm={{ gap: 2 }}
                />

                <Button
                    fullWidth
                    variant="contained"
                    onClick={() => formRef.current?.save()}
                    loading={isPending}
                    sx={{
                        mt: 3,
                        py: 1.6,
                        borderRadius: '12px',
                        textTransform: 'none',
                        fontSize: '1rem',
                        fontWeight: 700,
                        letterSpacing: 0.2,
                        background: 'linear-gradient(90deg, #2563eb, #1a3ea8)',
                        boxShadow: '0 8px 24px -6px rgba(37,99,235,0.45)',
                        '&:hover': {
                            background: 'linear-gradient(90deg, #1d55d4, #163399)',
                            boxShadow: '0 12px 28px -8px rgba(37,99,235,0.55)',
                            transform: 'translateY(-1px)',
                        },
                    }}
                >
                    Acceder
                </Button>

                <Typography
                    onClick={toForgot}
                    variant="body2"
                    sx={{
                        mt: 2.5,
                        textAlign: 'center',
                        color: 'var(--color-primary)',
                        cursor: 'pointer',
                        fontWeight: 500,
                        '&:hover': { opacity: 0.75 },
                    }}
                >
                    ¿Olvidaste tu contraseña?
                </Typography>
            </AuthLayout>

            <MfaModal
                open={openMfa}
                onClose={handleCloseMfa}
                pendingLogin={pendingLogin}
            />
        </>
    );
};

export default Login;
