// src/components/Contact.jsx
import React from 'react';
import Typography from '@mui/material/Typography';
import {
    ContactSection,
    ContactForm,
    Input,
    TextArea,
    SubmitButton,
} from '../styles/Contact.styles';

const Contact = () => {
    return (
        <ContactSection id="contact">
            <Typography variant="h4" component="h2" gutterBottom align="center">
                Contact Me
            </Typography>
            <ContactForm>
                <Input type="text" placeholder="Your Name" required />
                <Input type="email" placeholder="Your Email" required />
                <TextArea rows="5" placeholder="Your Message" required />
                <SubmitButton type="submit">Send Message</SubmitButton>
            </ContactForm>
        </ContactSection>
    );
};

export default Contact;
