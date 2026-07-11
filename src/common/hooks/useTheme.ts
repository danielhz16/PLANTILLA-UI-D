import { useThemeContext } from '../context/ThemeContext';
import { themeConfig } from '../const/theme';

export const useTheme = () => {
    const { theme, toggleTheme } = useThemeContext();
    const colors = themeConfig[theme];

    return {
        theme,
        colors,
        toggleTheme,
        isDark: theme === 'dark',
        isLight: theme === 'light',
    };
};
