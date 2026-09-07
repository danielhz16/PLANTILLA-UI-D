import { Modal } from "@/components/modal/Modal";
import { Typography, Button, Stack, Box, TextField } from "@mui/material";
import { useMfa } from "./useMfa";
import { useTheme } from "@/hooks/useTheme";
import { TypeMfa, type MfaOptions, type ResponseLogin } from "@/features/auth";
import { useCallback, useEffect, useRef, useState, type ChangeEvent, type ClipboardEvent, type KeyboardEvent } from "react";
import mfaImg from "@/assets/mfa.png";

interface MfaModalProps {
  open: boolean;
  onClose: () => void;
  pendingLogin?: ResponseLogin | null;
}

export interface MfaHandlers {
  handleSubmit: (data: { code: string; type: number }) => Promise<void>;
  handleResend: (method: number) => Promise<number>;
  handleBackToLogin: () => void;
  isPending: boolean;
  options: MfaOptions;
}

const OTP_LENGTH = 6;

type MfaError = {
  apiError?: { message?: string };
  message?: string;
  retryAfter?: number;
};

const getMfaError = (error: unknown): MfaError => (error ?? {}) as MfaError;

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${secs}`;
};

const getDefaultMethod = (options: MfaOptions): number => {
  if (options.mfaAuthenticator) return TypeMfa.AuthenticatorApp;
  if (options.mfaEmail) return TypeMfa.Email;
  if (options.mfaWp) return TypeMfa.WhatsApp;
  return TypeMfa.Email;
};

const getPrimaryMessage = (type: number): string => {
  switch (type) {
    case TypeMfa.AuthenticatorApp:
      return 'Ingresa el código de autenticación';
    case TypeMfa.Email:
      return 'Ingresa el código de 6 dígitos enviado a tu correo electrónico';
    case TypeMfa.WhatsApp:
      return 'Ingresa el código de 6 dígitos enviado a tu WhatsApp';
    default:
      return 'Ingresa el código de 6 dígitos';
  }
};

const getSendLabel = (type: number): string => {
  switch (type) {
    case TypeMfa.Email:
      return 'Enviar por correo electrónico';
    case TypeMfa.WhatsApp:
      return 'Enviar por WhatsApp';
    default:
      return 'Reenviar código';
  }
};

export const MfaForm = ({
  handleSubmit,
  isPending,
  toLogin,
  onClose,
  resendCode,
  options,
}: {
  handleSubmit: MfaHandlers['handleSubmit'];
  isPending: boolean;
  toLogin: () => void;
  onClose: () => void;
  resendCode: MfaHandlers['handleResend'];
  options: MfaOptions;
}) => {
  const { colors } = useTheme();
  const [values, setValues] = useState<string[]>(new Array(OTP_LENGTH).fill(''));
  const [error, setError] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isResending, setIsResending] = useState(false);
  const [activeType, setActiveType] = useState<number>(() => getDefaultMethod(options));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const sendMethods = [
    ...(options.mfaEmail ? [TypeMfa.Email] : []),
    ...(options.mfaWp ? [TypeMfa.WhatsApp] : []),
  ];

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

  const onKeyDown = useCallback((index: number, event: KeyboardEvent<HTMLDivElement>) => {
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
      await handleSubmit({ code, type: activeType });
    } catch (e: unknown) {
      const err = getMfaError(e);
      setError(err?.apiError?.message || err?.message || 'Código incorrecto');
    }
  }, [values, activeType, handleSubmit]);

  const requestCode = useCallback(async (method: number) => {
    if (timeLeft > 0 || isResending) return;
    setIsResending(true);
    setError('');
    setActiveType(method);
    try {
      const nextWait = await resendCode(method);
      setTimeLeft(nextWait);
    } catch (e: unknown) {
      const err = getMfaError(e);
      setError(err?.message || 'Error al enviar el código');
      if (err?.retryAfter) setTimeLeft(err.retryAfter);
    } finally {
      setIsResending(false);
    }
  }, [timeLeft, isResending, resendCode]);

  return (
    <>
      <Box
        sx={{
          width: '100%',
          maxWidth: 320,
          height: 200,
          margin: '0 auto',
          backgroundImage: `url(${mfaImg})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          mb: 1,
        }}
      />

      <Typography
        variant="body2"
        sx={{ color: colors.primary, fontWeight: 700, textAlign: 'center', mb: 2 }}
      >
        {getPrimaryMessage(activeType)}
      </Typography>

      <Box display="flex" justifyContent="center" gap={1.5} mb={2} onPaste={handlePaste}>
        {values.map((value, index) => (
          <TextField
            key={index}
            inputRef={(el) => (inputsRef.current[index] = el)}
            value={value}
            onChange={(event) => onChange(index, event as ChangeEvent<HTMLInputElement>)}
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
                color: colors.text,
                padding: 0,
                height: '58px',
              },
            }}
            sx={{
              width: 52,
              '& .MuiOutlinedInput-root': {
                borderRadius: '14px',
                minHeight: 58,
                backgroundColor: colors.bgInput,
                border: `1px solid ${colors.border}`,
                transition: 'all 0.2s ease',
                '&.Mui-focused': {
                  borderColor: colors.primary,
                  borderWidth: 2,
                  boxShadow: `0 0 0 4px ${colors.primarySoft}`,
                  backgroundColor: colors.bgInput,
                },
                '&:hover:not(.Mui-focused)': {
                  borderColor: colors.primary,
                  backgroundColor: colors.hover,
                },
              },
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              '& .MuiOutlinedInput-input': {
                padding: 0,
                textAlign: 'center',
                color: colors.text,
              },
            }}
          />
        ))}
      </Box>

      {error && (
        <Typography variant="body2" color="error" sx={{ mb: 1, textAlign: 'center' }}>
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
            color: colors.bgCard,
            background: `linear-gradient(90deg, ${colors.primary}, ${colors.primaryHover})`,
            boxShadow: `0 10px 30px -10px ${colors.shadowCard}`,
            '&:hover': {
              background: `linear-gradient(90deg, ${colors.primaryHover}, ${colors.primary})`,
              boxShadow: `0 12px 30px -10px ${colors.shadowCard}`,
              transform: 'translateY(-1px)',
            },
            '&.Mui-disabled': {
              color: colors.textMuted,
              background: colors.primarySoft,
              boxShadow: 'none',
              pointerEvents: 'none',
              opacity: 1,
            },
          }}
        >
          Verificar código
        </Button>

        {sendMethods.map((method) => (
          <Button
            key={method}
            fullWidth
            variant="outlined"
            disabled={timeLeft > 0 || isResending}
            loading={isResending && activeType === method}
            onClick={() => requestCode(method)}
            sx={{
              py: 1.15,
              minHeight: 50,
              borderRadius: '14px',
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 700,
              color: colors.primary,
              borderColor: colors.primary,
              backgroundColor: colors.bgCard,
              '&:hover': {
                backgroundColor: colors.primarySoft,
                borderColor: colors.primary,
              },
            }}
          >
            {getSendLabel(method)}{activeType === method && timeLeft > 0 && ` (${formatTime(timeLeft)})`}
          </Button>
        ))}
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
          color: colors.primary,
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

export const MfaModalShell = ({
  open,
  onClose,
  handleSubmit,
  handleResend,
  handleBackToLogin,
  isPending,
  options,
}: MfaHandlers & {
  open: boolean;
  onClose: () => void;
}) => {
  const activeType = getDefaultMethod(options);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Verificación en dos pasos"
      description={
        activeType === TypeMfa.AuthenticatorApp
          ? 'Usa tu aplicación de autenticación para generar el código.'
          : 'Completa la verificación en dos pasos para continuar.'
      }
      maxWidth="sm"
      content={
        <MfaForm
          key={open ? 'open' : 'closed'}
          options={options}
          handleSubmit={handleSubmit}
          isPending={isPending}
          toLogin={handleBackToLogin}
          onClose={onClose}
          resendCode={handleResend}
        />
      }
    />
  );
};

export const MfaModal = ({ open, onClose, pendingLogin }: MfaModalProps) => {
  const { handleSubmit, isPending, toLogin, resendCode, options } = useMfa(pendingLogin);

  return (
    <MfaModalShell
      open={open}
      onClose={onClose}
      handleSubmit={handleSubmit}
      handleResend={resendCode}
      handleBackToLogin={toLogin}
      isPending={isPending}
      options={options}
    />
  );
};

export default MfaModal;