// src/components/Contact.jsx
import React from 'react';
import {
    ContactSection,
    SectionTitle,
    ContactForm,
    Input,
    TextArea,
    SubmitButton,
} from '../styles/Contact.styles';

const Contact = () => {
    return (
        <ContactSection id="contact">
            <SectionTitle>Contact Me</SectionTitle>
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
