import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { ProductSelection } from './components/ProductSelection';
import { Payment } from './components/Payment';
import { Preparation } from './components/Preparation';

const theme = createTheme({
  palette: {
    primary: {
      main: '#795548',
    },
    secondary: {
      main: '#8d6e63',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<ProductSelection />} />
          <Route path="/payment/:productId" element={<Payment />} />
          <Route path="/preparation/:productId" element={<Preparation />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
