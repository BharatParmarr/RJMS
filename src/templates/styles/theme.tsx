import { createContext, useContext, useState } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

// Create a context for the theme
const ThemeContext = createContext<any>(null);

// Create a provider component for the theme
const ThemeProvider = ({ children }: any) => {
    const [themeMode, setThemeMode] = useState(localStorage.getItem('color-mode') || 'light');

    const theme = {
        colors: themeMode === 'light' ? {
            primary: '#0063e1', // Blue
            secondary: '#108700', // Green
            background: '#edf0ee', // Light grey
            objectBg: '#fff', // White
            text: '#202124', // Dark grey
            footerBg: '#202124',
            footerText: '#fff',
            shadow: 'rgba(0, 0, 0, 0.1)',
            black: '#000',
            white: '#fff',
            gray: '#828282',
        } : {
            primary: '#0063e1',
            secondary: '#108700',
            background: '#141414',
            objectBg: '#000',
            text: '#f5f5f5',
            footerBg: '#141414',
            footerText: '#f5f5f5',
            shadow: 'rgba(255, 255, 255, 0.1)',
            black: '#fff',
            white: '#000',
            gray: '#828282',
        },
        spacing: {
            padding: '20px',
            margin: '10px',
        },
    };

    const toggleTheme = () => {
        const newThemeMode = themeMode === 'light' ? 'dark' : 'light';
        localStorage.setItem('color-mode', newThemeMode);
        setThemeMode(newThemeMode);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <StyledThemeProvider theme={theme}>
                {children}
            </StyledThemeProvider>
        </ThemeContext.Provider>
    );
};

// Create a custom hook to use the theme context
const useTheme = () => useContext(ThemeContext);

export { ThemeProvider, useTheme };