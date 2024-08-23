import { PaletteMode } from '@mui/material';
import { createTheme, ThemeOptions } from '@mui/material/styles';
import { createContext, useMemo, useState } from 'react';

// Define light theme
const lightTheme: ThemeOptions = {
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
        background: {
            default: '#fafafa',
        },
    },
    typography: {
        fontFamily: 'Arial, sans-serif',
    },
    // Add more customizations if needed
};

// Define dark theme
const darkTheme: ThemeOptions = {
    palette: {
        mode: 'dark',
        primary: {
            main: '#90caf9',
        },
        secondary: {
            main: '#f48fb1',
        },
        background: {
            default: '#121212',
        },
    },
    typography: {
        fontFamily: 'Arial, sans-serif',
    },
    // Add more customizations if needed
};

export const ThemeColorContext = createContext({
    toggleColorMode: () => { }
});

export const useMode = () => {
    const [mode, setMode] = useState<PaletteMode>('dark');

    const colorMode = useMemo(() => ({
        toggleColorMode: () => {
            setMode((prevMode) => prevMode === 'dark' ? 'light' : 'dark');
        }
    }), [mode]);

    const theme = createTheme(mode === 'dark' ? darkTheme : lightTheme);

    return { colorMode, theme };
}