// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { getTheme } from './styles/theme';
import Header from './components/Header';
import Home from './pages/Home';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetail from './pages/ProjectDetail';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Research from './pages/ResearchPage';
import ResearchDetail from './pages/ResearchDetail';
import ResumePage from './pages/ResumePage';
import SkillsPage from './pages/SkillsPage';
import HighlightsPage from './pages/HighlightsPage';
import { AnimatePresence } from 'framer-motion';
import NotFound from './pages/NotFound';
import { HelmetProvider } from 'react-helmet-async'; // Import HelmetProvider

// Scroll to top on route change
const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [pathname]);
    return null;
};

// Wrapper to access location inside Router
const AppRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/projects/:id" element={<ProjectDetail />} />
                <Route path="/research" element={<Research />} />
                <Route path="/research/:id" element={<ResearchDetail />} />
                <Route path="/highlights" element={<HighlightsPage />} />
                <Route path="/resume" element={<ResumePage />} />
                <Route path="/skills" element={<SkillsPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </AnimatePresence>
    );
};

function App() {
    const [mode, setMode] = useState('light');

    // initialize theme from localStorage or OS preference
    useEffect(() => {
        try {
            const saved = localStorage.getItem('site:mode');
            if (saved === 'light' || saved === 'dark') {
                setMode(saved);
                return;
            }
        } catch (e) {}
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        setMode(prefersDark ? 'dark' : 'light');
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem('site:mode', mode);
        } catch (e) {}
    }, [mode]);

    const theme = getTheme(mode);

    return (
        <MuiThemeProvider theme={theme}>
            <StyledThemeProvider theme={theme}>
                <CssBaseline />
                <Router basename={"/my-portfolio/"}>
                    <HelmetProvider> {/* Wrap the app with HelmetProvider */}
                        <ScrollToTop />
                        <Header mode={mode} setMode={setMode} />
                        <AppRoutes />
                    </HelmetProvider>
                </Router>
            </StyledThemeProvider>
        </MuiThemeProvider>
    );
}

export default App;