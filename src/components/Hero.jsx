// src/components/Hero.jsx
import React from 'react';
import { Container, Box, Typography, Chip, Button, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';

// Define the motion variants for a staggered animation
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
};

const AnimatedAvatarContainer = styled(motion.div)(({ theme }) => ({
    position: 'relative',
    width: 240,
    height: 240,
    borderRadius: '50%',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: `0 0 10px ${theme.palette.primary.main}`,
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 'inherit',
        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        zIndex: -1,
        filter: 'blur(10px)',
        opacity: 0,
        transition: 'opacity 0.4s ease-in-out',
    },
    '&:hover::before': {
        opacity: 0.7,
    }
}));

const AvatarImage = styled.img(({ theme }) => ({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '50%',
    border: `4px solid ${theme.palette.background.paper}`,
    boxShadow: `0 0 15px ${theme.palette.text.primary}80`,
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
        transform: 'scale(1.05)',
    },
}));

export default function Hero() {
    const theme = useTheme();

    return (
        <Box sx={{
            bgcolor: 'background.default',
            py: { xs: 6, md: 8 },
            position: 'relative',
            overflow: 'hidden',
        }}>
            <Container maxWidth="lg">
                <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    spacing={4}
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
                        <motion.div variants={containerVariants} initial="hidden" animate="visible">
                            <motion.div variants={itemVariants}>
                                <Typography variant="overline" color="primary" sx={{ letterSpacing: 0.6, display: 'block' }}>
                                    Hello, I’m
                                </Typography>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <Typography variant="h3" component="h1" sx={{ fontWeight: 800, mt: 1 }}>
                                    Tsion Bizuayehu
                                </Typography>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <Typography variant="h6" color="text.secondary" sx={{ mt: 1, maxWidth: 720, mx: { xs: 'auto', md: '0' } }}>
                                    I build high-impact full-stack and AI solutions. With over 5 years of experience, I am passionate about creating robust and innovative systems that solve complex problems.
                                </Typography>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    sx={{ mt: 2, flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' } }}
                                >
                                    <Chip label="Full-Stack" color="primary" size="small" />
                                    <Chip label="AI / ML" size="small" />
                                    <Chip label="Software Engineering" size="small" />
                                    <Chip label="Research" size="small" />
                                </Stack>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <Stack
                                    direction={{ xs: 'column', sm: 'row' }}
                                    spacing={2}
                                    sx={{ mt: 3, justifyContent: { xs: 'center', md: 'flex-start' } }}
                                >
                                    <motion.div whileHover="hover" variants={buttonVariants}>
                                        <Button component={RouterLink} to="/projects" variant="contained" size="large">
                                            View Projects
                                        </Button>
                                    </motion.div>
                                    <motion.div whileHover="hover" variants={buttonVariants}>
                                        <Button component={RouterLink} to="/contact" variant="outlined" size="large">
                                            Contact
                                        </Button>
                                    </motion.div>
                                </Stack>
                            </motion.div>
                        </motion.div>
                    </Box>

                    <AnimatedAvatarContainer initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.6 }}>
                        <AvatarImage
                            src="/assets/profile3.png"
                            alt="A professional headshot of Tsion Bizuayehu"
                        />
                    </AnimatedAvatarContainer>
                </Stack>
            </Container>
        </Box>
    );
}