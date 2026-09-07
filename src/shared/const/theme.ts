export const themeConfig = {
    light: {
        // Core
        primary: '#3b82f6',
        secondary: '#8b5cf6',
        background: '#f8fafc',
        sidebar: 'rgba(255, 255, 255, 0.7)',
        text: '#1e293b',
        border: 'rgba(0, 0, 0, 0.1)',
        hover: 'rgba(0, 0, 0, 0.05)',

        // Semantic
        error: '#ef4444',
        success: '#10b981',
        warning: '#f59e0b',
        date: '#5a84c7',

        // Surfaces
        bgCard: '#ffffff',
        bgInput: '#ffffff',
        borderSoft: 'rgba(0, 0, 0, 0.05)',

        // Text
        textSecondary: '#64748b',
        textMuted: '#94a3b8',
        textOnPrimary: '#ffffff',
        sidebarNavText: '#64748b',

        // Primary interaction
        primaryHover: '#2563eb',
        primarySoft: 'rgba(59, 130, 246, 0.15)',

        // Tables
        tableHeader: 'rgba(255, 255, 255, 0.7)',
        tableRowBorder: 'rgba(0, 0, 0, 0.1)',
        tableRowHover: 'rgba(0, 0, 0, 0.02)',

        // Shadows
        shadowCard: 'rgba(0, 0, 0, 0.05)',
        shadowElevated: '0 25px 50px -12px rgba(0, 0, 0, 0.08)',
        shadowPopover: '0 16px 40px rgba(0, 0, 0, 0.1)',

        // Layout
        headerBg: 'rgba(248, 250, 252, 0.8)',
        sidebarShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        collapseBtnShadow: '0 10px 20px rgba(15, 23, 42, 0.18)',

        // Focus & interaction
        focusShadow: '0 8px 16px -4px rgba(59, 130, 246, 0.15)',
        navActiveShadow: '0 6px 20px -4px rgba(139, 92, 246, 0.3)',

        // Button shadows
        buttonShadow: 'rgba(37, 99, 235, 0.45)',
        buttonShadowHover: 'rgba(37, 99, 235, 0.55)',
        buttonHoverShadow: '0 15px 30px -5px rgba(37, 99, 235, 0.4)',

        // Semantic soft backgrounds
        warningSoft: 'rgba(245, 158, 11, 0.1)',
        errorSoft: 'rgba(239, 68, 68, 0.1)',
        infoSoft: 'rgba(59, 130, 246, 0.1)',
        successSoft: 'rgba(16, 185, 129, 0.1)',
        warningSoftHover: 'rgba(245, 158, 11, 0.2)',
        errorSoftHover: 'rgba(239, 68, 68, 0.2)',
        errorBg: 'rgba(239, 68, 68, 0.08)',

        // Loader
        loaderBackdrop: 'rgba(255, 255, 255, 0.55)',

        // Toast
        toastBg: 'rgba(255, 255, 255, 0.25)',
        toastBorder: 'rgba(255, 255, 255, 0.3)',

        // Gradient backgrounds
        gradientBgPrimary: 'rgba(59, 130, 246, 0.05)',
        gradientBgSecondary: 'rgba(139, 92, 246, 0.05)',
        gradientBgTertiary: 'transparent',
        gradientBgPrimaryPage: 'rgba(59, 130, 246, 0.05)',
        gradientBgSecondaryPage: 'rgba(139, 92, 246, 0.05)',

        // Auth
        authTextSecondary: 'rgba(255, 255, 255, 0.65)',

        // Logout
        logoutHoverBg: 'rgba(239, 68, 68, 0.1)',

        // ThemeToggle
        toggleBorderGlow: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))',
        toggleHoverShadow: '0 8px 20px rgba(59, 130, 246, 0.2)',
        toggleIconShadow: 'drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3))',

        // Options cell
        optionsTextHover: 'rgba(25, 118, 210, 0.04)',

        // Data visualization (same in both modes)
        chartIndigo: '#4640c2',
        chartBlue: '#3b82f6',
        chartGreen: '#22c55e',
        chartRed: '#ef4444',
        chartAmber: '#f59e0b',
    },
    dark: {
        // Core
        primary: '#60a5fa',
        secondary: '#a78bfa',
        background: '#0c111d',
        sidebar: '#111827',
        text: '#e8edf5',
        border: '#1e2d45',
        hover: '#172a47',

        // Semantic
        error: '#f87171',
        success: '#4ade80',
        warning: '#fbbf24',
        date: '#93c5fd',

        // Surfaces
        bgCard: '#111827',
        bgInput: '#0c111d',
        borderSoft: '#162035',

        // Text
        textSecondary: '#8b9ab5',
        textMuted: '#4e6080',
        textOnPrimary: '#ffffff',
        sidebarNavText: '#ffffff',

        // Primary interaction
        primaryHover: '#3b82f6',
        primarySoft: 'rgba(96, 165, 250, 0.15)',

        // Tables
        tableHeader: '#0f1a2e',
        tableRowBorder: '#162035',
        tableRowHover: 'rgba(96, 165, 250, 0.05)',

        // Shadows
        shadowCard: 'rgba(0, 0, 0, 0.6)',
        shadowElevated: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        shadowPopover: '0 16px 40px rgba(15, 23, 42, 0.5)',

        // Layout
        headerBg: 'rgba(15, 23, 42, 0.8)',
        sidebarShadow: '0 0 0 1px rgba(255, 255, 255, 0.03), 0 24px 48px -12px rgba(0, 0, 0, 0.7)',
        collapseBtnShadow: '0 4px 16px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.04)',

        // Focus & interaction
        focusShadow: '0 8px 16px -4px rgba(96, 165, 250, 0.2)',
        navActiveShadow: '0 6px 20px -4px rgba(96, 165, 250, 0.4)',

        // Button shadows
        buttonShadow: 'rgba(96, 165, 250, 0.45)',
        buttonShadowHover: 'rgba(96, 165, 250, 0.55)',
        buttonHoverShadow: '0 15px 30px -5px rgba(96, 165, 250, 0.4)',

        // Semantic soft backgrounds
        warningSoft: 'rgba(251, 191, 36, 0.1)',
        errorSoft: 'rgba(248, 113, 113, 0.1)',
        infoSoft: 'rgba(96, 165, 250, 0.1)',
        successSoft: 'rgba(74, 222, 128, 0.1)',
        warningSoftHover: 'rgba(251, 191, 36, 0.2)',
        errorSoftHover: 'rgba(248, 113, 113, 0.2)',
        errorBg: 'rgba(248, 113, 113, 0.08)',

        // Loader
        loaderBackdrop: 'rgba(12, 17, 29, 0.65)',

        // Toast
        toastBg: 'rgba(15, 23, 42, 0.4)',
        toastBorder: 'rgba(255, 255, 255, 0.1)',

        // Gradient backgrounds
        gradientBgPrimary: 'rgba(96, 165, 250, 0.07)',
        gradientBgSecondary: 'rgba(167, 139, 250, 0.05)',
        gradientBgTertiary: 'rgba(96, 165, 250, 0.03)',
        gradientBgPrimaryPage: 'rgba(59, 130, 246, 0.15)',
        gradientBgSecondaryPage: 'rgba(139, 92, 246, 0.15)',

        // Auth
        authTextSecondary: 'rgba(255, 255, 255, 0.65)',

        // Logout
        logoutHoverBg: 'rgba(248, 113, 113, 0.1)',

        // ThemeToggle
        toggleBorderGlow: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.3))',
        toggleHoverShadow: '0 8px 20px rgba(59, 130, 246, 0.2)',
        toggleIconShadow: 'drop-shadow(0 2px 4px rgba(251, 191, 36, 0.3))',

        // Options cell
        optionsTextHover: 'rgba(96, 165, 250, 0.04)',

        // Data visualization (same in both modes)
        chartIndigo: '#4640c2',
        chartBlue: '#3b82f6',
        chartGreen: '#22c55e',
        chartRed: '#ef4444',
        chartAmber: '#f59e0b',
    },
} as const;

export type ThemeType = 'light' | 'dark';
export type ThemeColors = typeof themeConfig.light;
