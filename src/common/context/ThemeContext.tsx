import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { themeConfig, type ThemeType } from '../const/theme';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

interface ThemeContextType {
    theme: ThemeType;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<ThemeType>(() => {
        const savedTheme = localStorage.getItem('theme');
        return (savedTheme as ThemeType) || 'light';
    });

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    useEffect(() => {
        localStorage.setItem('theme', theme);
        const root = document.documentElement;
        const colors = themeConfig[theme];

        Object.entries(colors).forEach(([key, value]) => {
            root.style.setProperty(`--color-${key}`, value);
        });

        root.setAttribute('data-theme', theme);
    }, [theme]);

    // Apply MUI Theme specifically to fix TextFields/Selects/Buttons in Dark Mode safely.
    const muiTheme = useMemo(() => {
        const colors = themeConfig[theme];
        return createTheme({
            palette: {
                mode: theme,
                primary: { main: colors.primary },
                background: {
                    default: colors.background,
                    paper: colors.bgCard,
                },
                text: {
                    primary: colors.text,
                    secondary: colors.textSecondary,
                },
                divider: colors.border,
            },
            typography: {
                fontFamily: "'Outfit', sans-serif",
            },
            components: {
                MuiPaper: {
                    styleOverrides: {
                        root: {
                            backgroundImage: 'none',
                            backgroundColor: colors.bgCard,
                            borderColor: colors.border,
                        },
                    },
                },
                MuiOutlinedInput: {
                    styleOverrides: {
                        root: {
                            borderRadius: 8,
                            backgroundColor: colors.bgInput,
                            color: colors.text,
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: colors.border,
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: colors.primary,
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: colors.primary,
                                borderWidth: 1,
                            },
                        },
                        input: { color: colors.text },
                    },
                },
                MuiInputLabel: {
                    styleOverrides: {
                        root: { color: colors.textSecondary },
                    },
                },
                MuiSelect: {
                    styleOverrides: {
                        icon: { color: colors.textSecondary },
                    },
                },
                MuiMenuItem: {
                    styleOverrides: {
                        root: {
                            color: colors.text,
                            '&:hover': { backgroundColor: colors.hover },
                            '&.Mui-selected': {
                                backgroundColor: colors.primarySoft,
                                '&:hover': { backgroundColor: colors.hover },
                            },
                        },
                    },
                },
                MuiTooltip: {
                    styleOverrides: {
                        tooltip: {
                            backgroundColor: colors.bgCard,
                            border: `1px solid ${colors.border}`,
                            color: colors.text,
                            fontSize: '0.75rem',
                            boxShadow: colors.shadowElevated,
                        },
                        arrow: {
                            color: colors.bgCard,
                        },
                    },
                },
                MuiDialog: {
                    styleOverrides: {
                        paper: {
                            backgroundColor: colors.bgCard,
                            backgroundImage: 'none',
                        },
                    },
                },
                MuiButton: {
                    styleOverrides: {
                        root: { textTransform: 'none', borderRadius: 8, fontWeight: 600 },
                        outlined: {
                            borderColor: colors.border,
                            color: colors.text,
                            '&:hover': {
                                borderColor: colors.primary,
                                backgroundColor: colors.hover,
                            },
                            '&.Mui-disabled': {
                                borderColor: colors.borderSoft,
                                color: colors.textMuted,
                            },
                        },
                    },
                },
                MuiDivider: {
                    styleOverrides: {
                        root: { borderColor: colors.border },
                    },
                },
                MuiTableContainer: {
                    styleOverrides: {
                        root: { backgroundColor: colors.background },
                    },
                },
            },
        });
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <MuiThemeProvider theme={muiTheme}>
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};

export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemeContext must be used within a ThemeProvider');
    }
    return context;
};
