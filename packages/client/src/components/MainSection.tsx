import { Box, Typography } from '@mui/material';
import React from 'react';
import CodeEditor from './CodeEditor';
import { PropType } from '../App';

const MainSection = (props: PropType) => {
    return (
        <Box width='70%' m='auto'>
            <Box>
                <Typography variant='h4' fontWeight='500'>
                    AI-Powered Code Quality Testing Tool
                </Typography>
            </Box>
            <CodeEditor {...props} />
        </Box>
    )
}

export default MainSection;