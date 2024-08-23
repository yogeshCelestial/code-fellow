import React, { useState } from 'react';
import { TextareaAutosize } from '@mui/base';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { analyzeCode } from '../utils/ai-prompt';
import _ from 'underscore';
import { PropType, ScoreType } from '../App';
import Loader from './Loader';

type PrevState = {
  checkReport: string; qualityScores: ScoreType[]; suggestions: string;
}
const CodeEditor = (props: PropType) => {
  const { setReport, isLoading, setIsLoading } = props;

  const theme = useTheme();
  const [code, setCode] = useState('// Paste your code here');

  function handleEditorChange(e: any) {
    setCode(e.target?.value);
  }

  function clearCode() {
    setCode('// Paste your code here');
  }

  async function runTool() {
    setIsLoading(true);
    const qualityReport = await analyzeCode(code);
    const reportGroup = _.groupBy(qualityReport, 'section');
    const checkReport = reportGroup?.['Check Report']?.[0].details;
    const qualityScores = reportGroup?.['Quality Scores']?.[0].details
    const suggestions = reportGroup?.['Suggestions for Improvements']?.[0].details;
    if (checkReport && qualityReport && suggestions) {
      setReport((prev: PrevState) => {
        return {
          ...prev,
          checkReport,
          qualityScores,
          suggestions,
        }
      });
    }
    setIsLoading(false);
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
          border: `2px solid ${theme.palette.mode === 'dark' ? 'white' : 'black'}`,
          borderRadius: '2px',
          color: theme.palette.mode === 'dark' ? 'white' : 'black'
        }
      }}
    >
      <Box width='80%' textAlign='left' m='10px auto 5px'>
        <Typography> Paste Code in below box or drop files here...</Typography>
      </Box>
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
      <Loader open={isLoading} />
    </Box>

  );
};

export default CodeEditor;