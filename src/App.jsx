// src/App.jsx
import React, { useState } from 'react';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { getTheme } from './styles/theme';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';

function App() {
    const [mode, setMode] = useState('light');
    const theme = getTheme(mode);

    return (
        <MuiThemeProvider theme={theme}>
            <StyledThemeProvider theme={theme}>
                <CssBaseline />
                <ThemeToggle mode={mode} setMode={setMode} />
                <Header />
                <Hero />
                <Projects />
                <About />
                <Contact />
                <Footer />
            </StyledThemeProvider>
        </MuiThemeProvider>
    );
}

export default App;
