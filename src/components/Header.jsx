import React, { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
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
import MenuIcon from '@mui/icons-material/Menu'; // Correct import path
import CloseIcon from '@mui/icons-material/Close'; // Correct import path
import { useTheme } from '@mui/material/styles';
import ThemeToggle from './ThemeToggle';

const navItems = [
    { label: 'Home', to: '/' },
    { label: 'Projects', to: '/projects' },
    { label: 'Research', to: '/research' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
];

const Header = ({ mode, setMode }) => {
    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.down('md'));
    const location = useLocation();
    const [open, setOpen] = useState(false);

    const activePath = location.pathname;

    return (
        <>
            <AppBar position="sticky" color="inherit" elevation={2}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={() => setOpen(true)}
                            sx={{ mr: 2, display: { md: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Tooltip title="Home">
                            <Avatar
                                src="/avatar.jpg"
                                alt="Tsion Bizuayehu"
                                sx={{ width: 40, height: 40, border: 1, borderColor: 'divider', mr: 2 }}
                                component={RouterLink}
                                to="/"
                            />
                        </Tooltip>
                        <Typography variant="h6" component="div" sx={{ fontWeight: 600, flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
                            <RouterLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                                Tsion Bizuayehu
                            </RouterLink>
                        </Typography>
                        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                            {navItems.map((item) => (
                                <Button
                                    key={item.to}
                                    component={RouterLink}
                                    to={item.to}
                                    sx={{
                                        color: 'text.primary',
                                        textTransform: 'none',
                                        fontWeight: activePath.startsWith(item.to) ? 700 : 500,
                                        borderBottom: activePath.startsWith(item.to) ? '2px solid' : 'none',
                                        borderColor: 'primary.main',
                                        borderRadius: 0,
                                    }}
                                >
                                    {item.label}
                                </Button>
                            ))}
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                        <ThemeToggle mode={mode} setMode={setMode} />
                    </Box>
                </Toolbar>
            </AppBar>
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