import { PaletteMode } from '@mui/material';
import { createTheme, ThemeOptions } from '@mui/material/styles';
import { createContext, useMemo, useState } from 'react';

// Define light theme

const typography = {
    typography: {
        fontFamily: ['Roboto', 'Sans-Sarif'].join(','),
        fontSize: 12,
    },
    h1: {
        fontFamily: ['Roboto', 'Sans-Sarif'].join(','),
        fontSize: 40,
    },
    h2: {
        fontFamily: ['Roboto', 'Sans-Sarif'].join(','),
        fontSize: 32,
    },
    h3: {
        fontFamily: ['Roboto', 'Sans-Sarif'].join(','),
        fontSize: 24,
    },
    h4: {
        fontFamily: ['Roboto', 'Sans-Sarif'].join(','),
        fontSize: 20,
    },
    h5: {
        fontFamily: ['Roboto', 'Sans-Sarif'].join(','),
        fontSize: 16,
    },
    h6: {
        fontFamily: ['Roboto', 'Sans-Sarif'].join(','),
        fontSize: 14,
    }
}
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
    ...typography
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
            default: '#26355D',
        },
    },
    ...typography
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