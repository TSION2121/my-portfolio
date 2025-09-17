// src/components/Hero.jsx
import React from 'react';
import { Container, Box, Typography, Chip, Button, Avatar, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';

// Define the motion variants for a staggered animation
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const chipVariants = {
    hover: { scale: 1.1, transition: { duration: 0.2 } },
};

export default function Hero() {
    const theme = useTheme();

    return (
        <Box sx={{ bgcolor: 'background.default', py: { xs: 6, md: 8 } }}>
            <Container maxWidth="lg">
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems="center" justifyContent="space-between">
                    <Box sx={{ flex: 1 }}>
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
                                <Typography variant="h6" color="text.secondary" sx={{ mt: 1, maxWidth: 720 }}>
                                    Software Engineer and MSc AI student. Reviewer-focused, accessible, and modular UI designed for reviewers and collaborators.
                                </Typography>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: 'wrap' }}>
                                    <motion.div whileHover="hover" variants={chipVariants}>
                                        <Chip label="Full Stack" color="primary" size="small" />
                                    </motion.div>
                                    <motion.div whileHover="hover" variants={chipVariants}>
                                        <Chip label="Front End" size="small" />
                                    </motion.div>
                                    <motion.div whileHover="hover" variants={chipVariants}>
                                        <Chip label="AI / ML" size="small" />
                                    </motion.div>
                                    <motion.div whileHover="hover" variants={chipVariants}>
                                        <Chip label="Space Science" size="small" />
                                    </motion.div>
                                </Stack>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                                    <Button component={RouterLink} to="/projects" variant="contained" size="large">View Projects</Button>
                                    <Button component={RouterLink} to="/contact" variant="outlined" size="large">Contact</Button>
                                </Stack>
                            </motion.div>
                        </motion.div>
                    </Box>

                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.6 }}>
                        <Box sx={{ width: 160, textAlign: 'center' }}>
                            <Avatar src="/avatar.jpg" alt="Tsion" sx={{ width: 140, height: 140, border: `2px solid ${theme.palette.divider}` }} />
                            <Typography variant="caption" display="block" sx={{ mt: 1, color: 'text.secondary' }}>
                                Addis Ababa, Ethiopia
                            </Typography>
                        </Box>
                    </motion.div>
                </Stack>
            </Container>
        </Box>
    );
}