import './App.css';
import { useMode } from './theme';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { ThemeColorContext } from './theme';
import ButtonAppBar from './components/TopBar';


function App() {
  const { theme, colorMode } = useMode();
  return (
    <ThemeColorContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <ButtonAppBar />
        </div>
      </ThemeProvider>
    </ThemeColorContext.Provider>
  );
}

export default App;
