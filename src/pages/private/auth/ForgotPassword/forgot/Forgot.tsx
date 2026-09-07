import { MainForm } from "@/ui/form/MainForm";
import { useForgotPassword } from "./useForgot";
import { inputs } from "./inputs";
import { Typography, Button, Stack } from "@mui/material";
import { Loader } from "@/ui";
import AuthLayout from "@/pages/public/auth/AuthLayout";

const ForgotPassword = () => {
    const { formRef, handleSubmbit, toLogin, isPending } = useForgotPassword();

    return (
        <AuthLayout subtitle="Te enviaremos instrucciones a tu correo electrónico">
            <Loader isPending={isPending} />

            <Stack gap={0.5} mb={4}>
                <Typography
                    variant="h5"
                    sx={{ fontWeight: 800, color: 'var(--color-text)', letterSpacing: -0.3 }}
                >
                    Recuperar contraseña
                </Typography>
                <Typography
                    variant="body2"
                    sx={{ color: 'var(--color-text)', opacity: 0.55 }}
                >
                    Ingresa tu usuario y te enviaremos el enlace
                </Typography>
            </Stack>

            <MainForm
                ref={formRef as any}
                inputs={inputs}
                onSubmit={handleSubmbit}
                columns={1}
                sx={{ width: '100%' }}
                sxForm={{ gap: 2 }}
            />

            <Button
                fullWidth
                variant="contained"
                onClick={() => formRef.current?.save()}
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
                Enviar instrucciones
            </Button>

            <Typography
                onClick={toLogin}
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
                Volver al inicio de sesión
            </Typography>
        </AuthLayout>
    );
};

export default ForgotPassword;
