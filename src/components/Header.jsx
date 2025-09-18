import React, { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
    IconButton,
    Typography,
    Box,
    Button,
    Drawer,
    List,
    ListItemButton,
    ListItemText,
    useMediaQuery,
    Avatar,
    Tooltip
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';
import ThemeToggle from './ThemeToggle';
import { HeaderContainer, Nav } from '../styles/Header.styles';

const navItems = [
    { label: 'Home', to: '/' },
    { label: 'Projects', to: '/projects' },
    { label: 'Research', to: '/research' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
];

const Header = ({ mode, setMode }) => {
    const theme = useTheme();
    const isMd = useMediaQuery(theme.breakpoints.down('md'));
    const location = useLocation();
    const [open, setOpen] = useState(false);

    const activePath = location.pathname;

    return (
        <>
            <HeaderContainer>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {isMd && (
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={() => setOpen(true)}
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Tooltip title="Home">
                        <Avatar
                            src="/avatar.jpg"
                            alt="Tsion Bizuayehu"
                            sx={{ width: 40, height: 40, border: 1, borderColor: 'divider', mr: 2 }}
                            component={RouterLink}
                            to="/"
                        />
                    </Tooltip>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 600, display: { xs: 'none', sm: 'block' } }}>
                        <RouterLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                            Tsion Bizuayehu
                        </RouterLink>
                    </Typography>
                </Box>

                <Nav>
                    {navItems.map((item) => (
                        <Button
                            key={item.to}
                            component={RouterLink}
                            to={item.to}
                            className={activePath.startsWith(item.to) ? 'nav-link active' : 'nav-link'}
                        >
                            {item.label}
                        </Button>
                    ))}
                </Nav>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ThemeToggle mode={mode} setMode={setMode} />
                </Box>
            </HeaderContainer>

            <Drawer
                variant="temporary"
                open={open}
                onClose={() => setOpen(false)}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280, p: 2 },
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        Menu
                    </Typography>
                    <IconButton onClick={() => setOpen(false)} aria-label="close menu">
                        <CloseIcon />
                    </IconButton>
                </Box>
                <List>
                    {navItems.map((item) => (
                        <ListItemButton
                            key={item.to}
                            component={RouterLink}
                            to={item.to}
                            onClick={() => setOpen(false)}
                            selected={activePath === item.to || activePath.startsWith(item.to)}
                            sx={{ borderRadius: 1, mb: 0.5 }}
                        >
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    ))}
                </List>
                <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'center' }}>
                    <ThemeToggle mode={mode} setMode={setMode} aria-label="theme toggle" />
                </Box>
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Typography variant="caption" color="text.secondary">
                        Built with React — client-only portfolio
                    </Typography>
                </Box>
            </Drawer>
        </>
    );
};

export default Header;