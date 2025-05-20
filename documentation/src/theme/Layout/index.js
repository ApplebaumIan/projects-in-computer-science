// src/theme/Layout.js
import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import muiTheme from './muiTheme';
import OriginalLayout from '@theme-original/Layout';

export default function Layout(props) {
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <OriginalLayout {...props} />
    </ThemeProvider>
  );
}
