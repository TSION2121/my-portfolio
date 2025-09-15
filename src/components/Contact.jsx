// src/components/Contact.jsx
import React from 'react';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
    ContactSection,
    ContactForm,
    Input,
    TextArea,
    SubmitButton,
} from '../styles/Contact.styles';
import { motion } from 'framer-motion';

const Contact = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <ContactSection id="contact">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <Typography
                    variant={isMobile ? 'h5' : 'h4'}
                    component="h2"
                    gutterBottom
                    align="center"
                >
                    Contact Me
                </Typography>
                <ContactForm>
                    <Input type="text" placeholder="Your Name" required />
                    <Input type="email" placeholder="Your Email" required />
                    <TextArea rows="5" placeholder="Your Message" required />
                    <SubmitButton type="submit">Send Message</SubmitButton>
                </ContactForm>
            </motion.div>
        </ContactSection>
    );
};

export default Contact;
