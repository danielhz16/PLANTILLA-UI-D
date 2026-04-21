import { MainForm } from "@/components/form/MainForm";
import { useForgotPassword } from "./useForgot";
import { inputs } from "./inputs";
import { Box, Typography, Container, Card, Button } from "@mui/material";
import { useTheme } from "@/hooks/useTheme";
import { Loader } from "@/common";

const ForgotPassword = () => {
  const { formRef, handleSubmbit, toLogin, isPending } = useForgotPassword();
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
      <Loader 
       isPending={isPending}
      />
      <Container maxWidth="sm">
        <Card
          sx={{
            p: 4,
            borderRadius: '24px',
            background: 'var(--color-background)',
            backdropFilter: 'blur(20px)',
            border: '1px solid var(--color-border)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: 'var(--color-text)',
              mb: 2,
              textAlign: 'center'
            }}
          >
            Recuperar contraseña
          </Typography>

          <MainForm
            ref={formRef as any}
            inputs={inputs}
            onSubmit={handleSubmbit}
            columns={1}
            sx={{ width: '100%' }}
            sxForm={{ gap: 1.5 }}
          />

          <Button
            fullWidth
            variant="contained"
            onClick={() => formRef.current?.save()}
            sx={{
              mt: 2,
              py: 1.5,
              borderRadius: '16px',
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 600,
              letterSpacing: 0.2
            }}
          >
            Enviar
          </Button>

          <Typography
           onClick={toLogin}
            sx={{
              display: 'block',
              mt: 2,
              textAlign: 'center',
              color: 'var(--color-primary)',
              textDecoration: 'none'
            }}
          >
            Volver al inicio de sesión
          </Typography>
        </Card>
      </Container>
    </Box>
  );
};

export default ForgotPassword;

