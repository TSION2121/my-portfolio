// src/App.jsx
import React from 'react';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import theme from './styles/theme';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
    return (
        <MuiThemeProvider theme={theme}>
            <StyledThemeProvider theme={theme}>
                <CssBaseline />
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
