import './App.css';
import { useMode } from './theme';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { ThemeColorContext } from './theme';
import ButtonAppBar from './components/TopBar';
import MainSection from './components/MainSection';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import ResultModal from './components/ResultModal';

export type ScoreType = {
   metric: string,
   score: number
}
export type PropType = {
  setReport: (report: {
    checkReport: string,
    qualityScores: ScoreType[],
    suggestions: string
  }) => void;
  setIsLoading: (loading: boolean) => void
}

export type initialType = {
  checkReport: string;
  qualityScores: ScoreType[];
  suggestions: string;
}

function App() {
  const { theme, colorMode } = useMode();
  const initial = {
    checkReport: '',
    qualityScores: [],
    suggestions: ''
  }

  const [report, setReport] = useState<initialType>(initial);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  console.log(report);
  console.log(isLoading);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (report.checkReport && report.qualityScores?.length && report.suggestions) {
      handleOpen();
    };
  }, [report]);

  return (
    <ThemeColorContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <ButtonAppBar />
          <MainSection setReport={setReport} setIsLoading={setIsLoading} />
          <ResultModal open={open} handleClose={handleClose} report={report} />
          <Footer />
        </div>
      </ThemeProvider>
    </ThemeColorContext.Provider>
  );
}

export default App;
