export const themeConfig = {
    light: {
        primary: '#3b82f6',
        secondary: '#8b5cf6',
        background: '#f8fafc',
        sidebar: 'rgba(255, 255, 255, 0.7)',
        text: '#1e293b',
        border: 'rgba(0, 0, 0, 0.1)',
        hover: 'rgba(0, 0, 0, 0.05)',
        error: '#ef4444',
        success: '#10b981',
        warning: '#f59e0b'
    },
    dark: {
        primary: '#3b82f6',
        secondary: '#8b5cf6',
        background: '#0f172a',
        sidebar: 'rgba(30, 41, 59, 0.7)',
        text: '#ffffffff',
        border: 'rgba(255, 255, 255, 0.1)',
        hover: 'rgba(255, 255, 255, 0.05)',
        error: '#ef4444',
        success: '#10b981',
        warning: '#f59e0b',
    },
};

export type ThemeType = 'light' | 'dark';
