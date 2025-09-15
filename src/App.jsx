// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { getTheme } from './styles/theme';
import Header from './components/Header';
import ThemeToggle from './components/ThemeToggle';
import Home from './pages/Home';

function App() {
    const [mode, setMode] = useState('light');
    const theme = getTheme(mode);

    return (
        <MuiThemeProvider theme={theme}>
            <StyledThemeProvider theme={theme}>
                <CssBaseline />
                <Router>
                    <ThemeToggle mode={mode} setMode={setMode} />
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        {/* Optional: add more routes like /projects, /about, etc. */}
                    </Routes>
                </Router>
            </StyledThemeProvider>
        </MuiThemeProvider>
    );
}

export default App;
