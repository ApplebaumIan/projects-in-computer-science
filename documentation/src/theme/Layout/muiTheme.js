// src/theme/muiTheme.js
import { createTheme } from '@mui/material/styles';

export default createTheme({
    palette: {
        primary: { main: '#1976d2' },
        secondary: { main: '#9c27b0' },
        background: { default: '#f4f6f8', paper: '#ffffff' },
    },
    typography: {
        fontFamily: '"Inter","Roboto","Helvetica","Arial",sans-serif',
        h4: { fontWeight: 600, letterSpacing: '0.5px' },
        h6: { fontWeight: 500 },
        body1: { lineHeight: 1.6 },
    },
    shape: { borderRadius: 8 },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: { boxShadow: '0px 4px 12px rgba(0,0,0,0.05)' }
            }
        },
        MuiDataGrid: {
            styleOverrides: {
                root: {
                    border: 0,
                    '.MuiDataGrid-cell': { paddingTop: 12, paddingBottom: 12 }
                },
                columnHeaders: { backgroundColor: '#e3f2fd' }
            }
        }
    }
});
