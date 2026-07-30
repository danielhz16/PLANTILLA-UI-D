import { MainForm } from "@/components/form/MainForm";
import { inputs } from "./inputs.mfa";
import { Typography, Button, Stack } from "@mui/material";
import { useMfa } from "./useMfa";
import AuthLayout from "./AuthLayout";
import { Loader } from "@/common";

const Mfa = () => {
    const { formRef, handleSubmit, isPending, toLogin } = useMfa();

    return (
        <AuthLayout subtitle="Ingresa el código que recibiste para completar la autenticación en dos pasos">
            <Loader isPending={isPending} />

            <Stack gap={0.5} mb={4}>
                <Typography
                    variant="h5"
                    sx={{ fontWeight: 800, color: 'var(--color-text)', letterSpacing: -0.3 }}
                >
                    Autenticación en dos pasos
                </Typography>
                <Typography
                    variant="body2"
                    sx={{ color: 'var(--color-text)', opacity: 0.55 }}
                >
                    Escribe el código que te enviamos por tu método de verificación.
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
                    background: 'linear-gradient(90deg, var(--color-primary), var(--color-primaryHover))',
                    boxShadow: '0 8px 24px -6px var(--color-buttonShadow)',
                    '&:hover': {
                        background: 'linear-gradient(90deg, var(--color-primaryHover), var(--color-primary))',
                        boxShadow: '0 12px 28px -8px var(--color-buttonShadowHover)',
                        transform: 'translateY(-1px)',
                    },
                }}
            >
                Verificar código
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
                Volver a iniciar sesión
            </Typography>
        </AuthLayout>
    );
};

export default Mfa;
