// src/pages/ResearchPage.jsx
import React from 'react';
import PageWrapper from '../components/PageWrapper';
import Research from '../components/Research';
import { Helmet } from 'react-helmet-async'; // Import Helmet

export default function ResearchPage() {
    return (
        <PageWrapper>
            <Helmet>
                <title>Research — Tsion Bizuayehu</title>
                <meta name="description" content="Explore academic research papers, publications, and abstracts by Tsion Bizuayehu on topics including AI, MBSE, and computer vision." />
            </Helmet>
            <Research />
        </PageWrapper>
    );
}