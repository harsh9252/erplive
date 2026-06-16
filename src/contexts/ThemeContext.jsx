import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        // Load stored theme or default to 'light'
        return localStorage.getItem('theme') || 'light';
    });

    useEffect(() => {
        // Sync with HTML attribute for Bootstrap 5 dark mode
        document.documentElement.setAttribute('data-bs-theme', theme);
        // Persist setting
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const setThemeExplicitly = (newTheme) => {
        if (newTheme === 'auto') {
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setTheme(systemPrefersDark ? 'dark' : 'light');
        } else {
            setTheme(newTheme);
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme: setThemeExplicitly }}>
            {children}
        </ThemeContext.Provider>
    );
};
