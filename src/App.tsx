import React from 'react';
import Routes from 'routes';
import CssBaseline from '@mui/material/CssBaseline'
import { BrowserRouter } from 'react-router-dom'
import LoadingContextProvider from 'context/LoadingContext';
import SnackContextProvider from 'context/SnackContext';
import ThemeProviderWrapper from 'theme/ThemeProvider';

function App() {
  return (
    <ThemeProviderWrapper>
      <CssBaseline />
      <LoadingContextProvider>
        <SnackContextProvider>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </SnackContextProvider>
      </LoadingContextProvider>
    </ThemeProviderWrapper>
  );
}

export default App;
