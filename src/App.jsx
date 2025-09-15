import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { getTheme } from './styles/theme';
import Header from './components/Header';
import ThemeToggle from './components/ThemeToggle';
import Home from './pages/Home';
import ProjectsPage from './pages/ProjectsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import { AnimatePresence } from 'framer-motion';

// Wrapper to access location inside Router
const AppRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </AnimatePresence>

    );
};

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
                    <AppRoutes />
                </Router>
            </StyledThemeProvider>
        </MuiThemeProvider>
    );
}

export default App;
