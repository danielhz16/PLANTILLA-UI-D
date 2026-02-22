import { Box, Container, Card, Typography } from "@mui/material";
import { useTheme } from "@/hooks/useTheme";
import { Link as RouterLink } from "react-router";

interface AuthFormWrapperProps {
  title: string;
 
  backLink?: { to: string; label: string };
  children: React.ReactNode;
}


const AuthFormWrapper = ({ title, backLink, children }: AuthFormWrapperProps) => {
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
            {title}
          </Typography>

          {children}

          {backLink && (
            <Typography
              component={RouterLink}
              to={backLink.to}
              sx={{
                display: 'block',
                mt: 2,
                textAlign: 'center',
                color: 'var(--color-primary)',
                textDecoration: 'none'
              }}
            >
              {backLink.label}
            </Typography>
          )}
        </Card>
      </Container>
    </Box>
  );
};

export default AuthFormWrapper;
