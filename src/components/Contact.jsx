import React from 'react';
import { motion } from 'framer-motion';
import {
    Typography,
    Box,
    Button,
    Stack,
} from '@mui/material';
import {
    ContactSection,
} from '../styles/Contact.styles';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
        },
    };

    const contactLinks = [
        {
            label: 'Email',
            icon: <FaEnvelope size={20} />,
            href: "mailto:tsionbizuayehu3@gmail.com",
            color: 'primary',
            variant: 'contained',
        },
        {
            label: 'LinkedIn',
            icon: <FaLinkedin size={20} />,
            href: "https://www.linkedin.com/in/tsion-bizuayehu-1932b91aa/",
            color: 'inherit',
            variant: 'outlined',
        },
        {
            label: 'GitHub',
            icon: <FaGithub size={20} />,
            href: "https://github.com/TSION2121",
            color: 'inherit',
            variant: 'outlined',
        },
    ];

    return (
        <ContactSection id="contact">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{ textAlign: 'center' }}
            >
                <motion.div variants={itemVariants}>
                    <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 2 }}>
                        Get in Touch
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 4 }}>
                        Feel free to reach out through any of these platforms.
                    </Typography>
                </motion.div>

                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={2}
                    justifyContent="center"
                    alignItems="center"
                    component={motion.div}
                    variants={containerVariants}
                >
                    {contactLinks.map((link, index) => (
                        <motion.div variants={itemVariants} key={index}>
                            <Button
                                component="a"
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                variant={link.variant}
                                color={link.color}
                                startIcon={link.icon}
                                sx={{
                                    textTransform: 'none',
                                    fontWeight: 'bold',
                                    minWidth: 160,
                                }}
                            >
                                {link.label}
                            </Button>
                        </motion.div>
                    ))}
                </Stack>
            </motion.div>
        </ContactSection>
    );
};

export default Contact;