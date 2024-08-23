import React, { useState } from 'react';
import { TextareaAutosize } from '@mui/base';
import { Box, Button, useTheme } from '@mui/material';

const CodeEditor = () => {
  const theme = useTheme();
  const [code, setCode] = useState('// Paste your code here');

  function handleEditorChange(e: any) {
    setCode(e.target?.value);
  }

  function clearCode() {
    setCode('// Paste your code here');
  }

  function runTool() {
    // functionality here
  }

  return (
    <Box
      display='flex'
      flexDirection='column'
      p='20px'
      sx={{
        '& .textAreaElement-001': {
          width: '80%',
          backgroundColor: theme.palette.mode === 'dark' ? '#222831' : 'whitesmoke',
          borderRadius: '12px',
          color: theme.palette.mode === 'dark' ? 'white' : 'black'
        }
      }}
    >
      <Box>
        <TextareaAutosize
          minRows={20}
          className='textAreaElement-001'
          maxRows={1000}
          value={code}
          onChange={handleEditorChange}
        />
      </Box>

      <Box
        m='20px auto'
        width='80%'
        display='flex'
        justifyContent='flex-end'
        sx={{
          '& .MuiButton-contained': {
            marginLeft: '30px'
          }
        }}
      >
        <Button variant='outlined' onClick={clearCode}>Clear</Button>
        <Button variant='contained' onClick={runTool}>Run Tool</Button>
      </Box>
    </Box>

  );
};

export default CodeEditor;