import { Modal } from "@/components/modal/Modal";
import { Typography, Button, Stack, Box, TextField } from "@mui/material";
import { useMfa } from "./useMfa";
import type { ResponseLogin } from "@/common";
import { useCallback, useEffect, useRef, useState, type ChangeEvent, type ClipboardEvent, type KeyboardEvent } from "react";
import mfaImg from "@/assets/mfa.png";

interface MfaModalProps {
  open: boolean;
  onClose: () => void;
  pendingLogin?: ResponseLogin | null;
}

const OTP_LENGTH = 6;

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${secs}`;
};

export const MfaForm = ({
  handleSubmit,
  isPending,
  toLogin,
  onClose,
  resendCode,
}: {
  handleSubmit: (data: { code: string }) => Promise<void>;
  isPending: boolean;
  toLogin: () => void;
  onClose: () => void;
  resendCode: () => Promise<number>;
}) => {
  const [values, setValues] = useState<string[]>(new Array(OTP_LENGTH).fill(''));
  const [error, setError] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isResending, setIsResending] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setTimeout(() => inputsRef.current[0]?.focus(), 50);
  }, []);

  const onChange = useCallback((index: number, event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.replace(/\D/g, '');
    if (newValue.length > 1) return;

    setValues((prev) => {
      const next = [...prev];
      next[index] = newValue;
      return next;
    });

    if (newValue && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  }, []);

  const onKeyDown = useCallback((index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && !values[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  }, [values]);

  const handlePaste = useCallback((event: ClipboardEvent) => {
    event.preventDefault();
    const pasted = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    if (!pasted) return;

    setValues((prev) => {
      const next = [...prev];
      pasted.split('').forEach((char, i) => {
        next[i] = char;
      });
      return next;
    });

    const focusIndex = Math.min(pasted.length, OTP_LENGTH - 1);
    inputsRef.current[focusIndex]?.focus();
  }, []);

  const submitCode = useCallback(async () => {
    const code = values.join('');
    if (code.length !== OTP_LENGTH) {
      setError('Ingresa los 6 dígitos del código');
      return;
    }

    setError('');
    try {
      await handleSubmit({ code });
    } catch (e: any) {
      setError(e?.apiError?.message || e?.message || 'Código incorrecto');
    }
  }, [values, handleSubmit]);

  return (
    <>
      <Stack alignItems="center" gap={2} mb={3}>
        <Box
          sx={{
            width: '100%',
            maxWidth: 320,
            height: 220,
            backgroundImage: `url(${mfaImg})`,
            backgroundSize: '115%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            mixBlendMode: 'multiply',
            mb: -2,
          }}
        />

        <Typography
          variant="h5"
          sx={{ fontWeight: 800, color: 'var(--color-text)', letterSpacing: '-0.03em' }}
        >
          Verificación en dos pasos
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: 'var(--color-text)', opacity: 0.72, maxWidth: 380, textAlign: 'center' }}
        >
          Hemos enviado un código de 6 dígitos a tu correo electrónico.
        </Typography>
      </Stack>

      <Typography
        variant="body2"
        sx={{ color: 'var(--color-primary)', fontWeight: 700, textAlign: 'center', mb: 2 }}
      >
        Ingresa el código de 6 dígitos
      </Typography>

      <Box display="flex" justifyContent="center" gap={1.5} mb={2} onPaste={handlePaste}>
        {values.map((value, index) => (
          <TextField
            key={index}
            inputRef={(el) => (inputsRef.current[index] = el)}
            value={value}
            onChange={(event) => onChange(index, event)}
            onKeyDown={(event) => onKeyDown(index, event)}
            inputProps={{
              inputMode: 'numeric',
              pattern: '[0-9]*',
              maxLength: 1,
              autoComplete: 'one-time-code',
              style: {
                textAlign: 'center',
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'var(--color-text)',
                padding: 0,
                height: '58px',
              },
            }}
            sx={{
              width: 52,
              '& .MuiOutlinedInput-root': {
                borderRadius: '14px',
                minHeight: 58,
                backgroundColor: 'var(--color-bgInput)',
                border: '1px solid var(--color-border)',
                transition: 'all 0.2s ease',
                '&.Mui-focused': {
                  borderColor: 'var(--color-primary)',
                  borderWidth: 2,
                  boxShadow: '0 0 0 4px var(--color-primarySoft)',
                  backgroundColor: 'var(--color-bgInput)',
                },
                '&:hover:not(.Mui-focused)': {
                  borderColor: 'var(--color-primary)',
                  backgroundColor: 'var(--color-hover)',
                },
              },
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              '& .MuiOutlinedInput-input': {
                padding: 0,
                textAlign: 'center',
                color: 'var(--color-text)',
              },
            }}
          />
        ))}
      </Box>

      {error && (
        <Typography variant="body2" color="error" sx={{ mb: 1 }}>
          {error}
        </Typography>
      )}

      <Stack gap={1.25} mb={1.5}>
        <Button
          fullWidth
          variant="contained"
          onClick={submitCode}
          loading={isPending}
          sx={{
            py: 1.25,
            minHeight: 50,
            borderRadius: '14px',
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 700,
            color: 'var(--color-bgCard)',
            background: 'linear-gradient(90deg, var(--color-primary), var(--color-primaryHover))',
            boxShadow: '0 10px 30px -10px var(--color-shadowCard)',
            '&:hover': {
              background: 'linear-gradient(90deg, var(--color-primaryHover), var(--color-primary))',
              boxShadow: '0 12px 30px -10px var(--color-shadowCard)',
              transform: 'translateY(-1px)',
            },
            '&.Mui-disabled': {
              color: 'var(--color-textMuted)',
              background: 'var(--color-primarySoft)',
              boxShadow: 'none',
              pointerEvents: 'none',
              opacity: 1,
            },
          }}
        >
          Verificar código
        </Button>

        <Button
          fullWidth
          variant="outlined"
          disabled={timeLeft > 0 || isResending}
          onClick={async () => {
            if (timeLeft > 0 || isResending) return;
            setIsResending(true);
            setError('');
            try {
              const nextWait = await resendCode();
              setTimeLeft(nextWait);
            } catch (e: any) {
              setError(e?.message || 'Error al reenviar el código');
              if (e?.retryAfter) setTimeLeft(e.retryAfter);
            } finally {
              setIsResending(false);
            }
          }}
          sx={{
            py: 1.15,
            minHeight: 50,
            borderRadius: '14px',
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 700,
            color: 'var(--color-primary)',
            borderColor: 'var(--color-primary)',
            backgroundColor: 'var(--color-bgCard)',
            '&:hover': {
              backgroundColor: 'var(--color-primarySoft)',
              borderColor: 'var(--color-primary)',
            },
          }}
        >
          Enviar por correo electrónico {timeLeft > 0 && `(${formatTime(timeLeft)})`}
        </Button>
      </Stack>

      <Typography
        onClick={() => {
          onClose();
          toLogin();
        }}
        variant="body2"
        sx={{
          mt: 1,
          textAlign: 'center',
          color: 'var(--color-primary)',
          cursor: 'pointer',
          fontWeight: 500,
          '&:hover': { opacity: 0.8 },
        }}
      >
        Volver a iniciar sesión
      </Typography>
    </>
  );
};

export const MfaModal = ({ open, onClose, pendingLogin }: MfaModalProps) => {
  const { handleSubmit, isPending, toLogin, resendCode } = useMfa(pendingLogin);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Autenticación en dos pasos"
      maxWidth="sm"
      sx={{ width: '100%', maxWidth: 580, p: 0 }}
    >
      <MfaForm
        key={open ? 'open' : 'closed'}
        handleSubmit={handleSubmit}
        isPending={isPending}
        toLogin={toLogin}
        onClose={onClose}
        resendCode={resendCode}
      />
    </Modal>
  );
};

export default MfaModal;
