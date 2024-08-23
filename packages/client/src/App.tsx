import './App.css';
import { useMode } from './theme';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { ThemeColorContext } from './theme';
import ButtonAppBar from './components/TopBar';
import MainSection from './components/MainSection';
import Footer from './components/Footer';
import { useState } from 'react';

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

  console.log(report);
  console.log(isLoading)

  return (
    <ThemeColorContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <ButtonAppBar />
          <MainSection setReport={setReport} setIsLoading={setIsLoading} />
          <Footer />
        </div>
      </ThemeProvider>
    </ThemeColorContext.Provider>
  );
}

export default App;
