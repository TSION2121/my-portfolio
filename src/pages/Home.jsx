// src/pages/Home.jsx
import React from 'react';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home = () => (
    <>
        <Hero />
        <Projects />
        <About />
        <Contact />
        <Footer />
    </>
);

export default Home;
