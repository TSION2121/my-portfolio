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
    Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';
import ThemeToggle from './ThemeToggle'; // integrated toggle

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
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <RouterLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Avatar src="/avatar.jpg" alt="Tsion" sx={{ width: 40, height: 40 }} />
                                <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
                                    Tsion Bizuayehu
                                </Typography>
                            </Box>
                        </RouterLink>
                    </Box>

                    {isSm ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Tooltip title={mode === 'dark' ? 'Switch to light' : 'Switch to dark'}>
                                <Box>
                                    <ThemeToggle mode={mode} setMode={setMode} />
                                </Box>
                            </Tooltip>

                            <IconButton
                                edge="end"
                                aria-label="open navigation"
                                onClick={() => setOpen(true)}
                                size="large"
                            >
                                <MenuIcon />
                            </IconButton>
                        </Box>
                    ) : (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {navItems.map((item) => {
                                const isActive = item.to === '/' ? activePath === '/' : activePath.startsWith(item.to);
                                return (
                                    <Button
                                        key={item.to}
                                        component={RouterLink}
                                        to={item.to}
                                        color="inherit"
                                        sx={{
                                            textTransform: 'none',
                                            fontWeight: isActive ? 700 : 500,
                                            borderBottom: isActive ? `3px solid ${theme.palette.primary.main}` : '3px solid transparent',
                                            borderRadius: 0,
                                            '&:hover': { background: 'transparent' },
                                        }}
                                    >
                                        {item.label}
                                    </Button>
                                );
                            })}

                            <Tooltip title={mode === 'dark' ? 'Switch to light' : 'Switch to dark'}>
                                <Box sx={{ ml: 1 }}>
                                    <ThemeToggle mode={mode} setMode={setMode} />
                                </Box>
                            </Tooltip>
                        </Box>
                    )}
                </Toolbar>
            </AppBar>

            <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
                <Box sx={{ width: 300, p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="h6">Menu</Typography>
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

                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                        <ThemeToggle mode={mode} setMode={setMode} aria-label="theme toggle" />
                    </Box>

                    <Box sx={{ mt: 2 }}>
                        <Typography variant="caption" color="textSecondary">
                            Built with React — client-only portfolio
                        </Typography>
                    </Box>
                </Box>
            </Drawer>
        </>
    );
};

export default Header;
