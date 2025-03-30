import React from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import URLShortener from './components/URLShortener';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <URLShortener />
      </Container>
    </ThemeProvider>
  );
}

export default App;