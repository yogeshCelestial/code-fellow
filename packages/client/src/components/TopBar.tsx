import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { DarkModeOutlined, LightModeOutlined } from '@mui/icons-material';
import { ThemeColorContext } from '../theme';
import { useTheme } from '@mui/material';
import logoNoBG from './../assets/png/logo-no-background.png'
import logoBlack from './../assets/png/logo-black.png'



export default function ButtonAppBar() {
    const { toggleColorMode } = React.useContext(ThemeColorContext);
    const theme = useTheme();

    const changeMode = () => {
        toggleColorMode();
    }
    return (
        <Box display='flex' p="20px 40px" justifyContent='space-between' width='100%'>
            <Box>
                {theme.palette.mode === 'dark' ? (
                    <img height='60px' width='220px' src={logoNoBG} alt='App Logo' />
                )
                    : (
                        <img height='60px' width='220px' src={logoBlack} alt='App Logo' />
                    )}
            </Box>
            <Box>
                <IconButton onClick={changeMode}>
                    {theme.palette.mode === 'dark' ? <LightModeOutlined /> : <DarkModeOutlined />}
                </IconButton>
            </Box>
        </Box>
    );
}
