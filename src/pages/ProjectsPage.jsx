// src/pages/ProjectsPage.jsx
import React from 'react';
import PageWrapper from '../components/PageWrapper';
import Projects from '../components/Projects';
import { Helmet } from 'react-helmet-async'; // Import Helmet

export default function ProjectsPage() {
    return (
        <PageWrapper>
            <Helmet>
                <title>Projects — Tsion Bizuayehu</title>
                <meta name="description" content="Browse through a curated list of software engineering and full-stack development projects by Tsion Bizuayehu." />
            </Helmet>
            <Projects />
        </PageWrapper>
    );
}