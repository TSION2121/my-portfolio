// src/pages/ResumePage.jsx
import React from 'react';
import { Container, Box, Typography, Button, Stack, Divider } from '@mui/material';
import PageWrapper from '../components/PageWrapper'; // your existing wrapper
import DownloadIcon from '@mui/icons-material/Download';

export default function ResumePage() {
    // public/resume.pdf must exist
    const resumeUrl = '../assets/resume/resume.pdf';

    return (
        <PageWrapper>
            <Container maxWidth="md" sx={{ py: 6 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 3, mb: 3, flexWrap: 'wrap' }}>
                    <Box>
                        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
                            Resume
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
                            Tsion Bizuayehu — Front End Engineer & MSc AI student
                        </Typography>
                    </Box>

                    <Stack direction="row" spacing={2}>
                        <Button
                            component="a"
                            href={resumeUrl}
                            download="Tsion_Bizuayehu_Resume.pdf"
                            variant="contained"
                            startIcon={<DownloadIcon />}
                            aria-label="Download resume PDF"
                        >
                            Download Resume
                        </Button>

                        <Button
                            component="a"
                            href={resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="outlined"
                            aria-label="Open resume in new tab"
                        >
                            Open PDF
                        </Button>
                    </Stack>
                </Box>

                <Divider sx={{ mb: 3 }} />

                <Box sx={{ mb: 2 }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>Quick links</Typography>
                    <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
                        <Button href="/projects" variant="text">Projects</Button>
                        <Button href="/research" variant="text">Research</Button>
                        <Button href="/contact" variant="text">Contact</Button>
                    </Stack>
                </Box>

                <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                        Preview (scrollable): If the PDF does not display below, click Open PDF to view in a new tab.
                    </Typography>
                </Box>

                <Box sx={{ width: '100%', minHeight: 600, borderRadius: 1, overflow: 'hidden', boxShadow: 1 }}>
                    <object
                        data={resumeUrl}
                        type="application/pdf"
                        width="100%"
                        height="100%"
                        aria-label="Resume preview"
                    >
                        <iframe
                            src={resumeUrl}
                            title="Resume preview"
                            width="100%"
                            height="600px"
                            style={{ border: 'none' }}
                        />
                        <Box sx={{ p: 2 }}>
                            <Typography>Preview unavailable. <a href={resumeUrl} target="_blank" rel="noopener noreferrer">Open the PDF</a> or download it.</Typography>
                        </Box>
                    </object>
                </Box>
            </Container>
        </PageWrapper>
    );
}
