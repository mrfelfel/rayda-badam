'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  direction: 'rtl',
  palette: {
    primary: { main: '#ec4899', light: '#fbcfe8', dark: '#be185d', contrastText: '#fff' },
    secondary: { main: '#8b5cf6', light: '#c4b5fd', dark: '#6d28d9' },
    success: { main: '#10b981' },
    warning: { main: '#f59e0b' },
    error: { main: '#ef4444' },
    background: { default: '#f9fafb', paper: '#ffffff' },
  },
  typography: {
    fontFamily: '"Vazirmatn", "Tahoma", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    button: { fontWeight: 600, textTransform: 'none' },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiButton: { styleOverrides: { root: { borderRadius: 12, padding: '10px 20px', fontWeight: 600 } } },
    MuiCard: { styleOverrides: { root: { borderRadius: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' } } },
    MuiTextField: { styleOverrides: { root: { '& .MuiOutlinedInput-root': { borderRadius: 12 } } } },
    MuiChip: { styleOverrides: { root: { borderRadius: 10 } } },
    MuiTab: { styleOverrides: { root: { fontWeight: 600 } } },
    MuiDialog: { styleOverrides: { paper: { borderRadius: 24 } } },
    MuiDrawer: { styleOverrides: { paper: { borderRadius: '24px 24px 0 0' } } },
  },
});

export default theme;
