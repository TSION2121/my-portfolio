import React from 'react';
import { Container, Box, Typography, Button, Stack, Divider } from '@mui/material';
import PageWrapper from '../components/PageWrapper';
import DownloadIcon from '@mui/icons-material/Download';
import { Helmet } from 'react-helmet-async';
import { PdfContainer } from '../styles/Resume.styles'; // Import from the new file

export default function ResumePage() {
    const resumeUrl = '/assets/resume/resume.pdf';

    return (
        <PageWrapper>
            <Helmet>
                <title>Tsion Bizuayehu — Resume</title>
                <meta name="description" content="View and download the professional resume of Tsion Bizuayehu." />
            </Helmet>
            <Container maxWidth="md" sx={{ py: 6 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 3, mb: 3, flexWrap: 'wrap' }}>
                    <Box>
                        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
                            Resume
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
                            Tsion Bizuayehu — Senior Software Engineer & MSc AI
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
                            Download PDF
                        </Button>
                    </Stack>
                </Box>
                <Divider sx={{ mb: 3 }} />
                <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                        Preview (scrollable): If the PDF does not display, ensure the file is in your public folder.
                    </Typography>
                </Box>
                <PdfContainer>
                    <object
                        data={resumeUrl}
                        type="application/pdf"
                        aria-label="Resume preview"
                    >
                        <iframe
                            src={resumeUrl}
                            title="Resume preview"
                        />
                    </object>
                </PdfContainer>
            </Container>
        </PageWrapper>
    );
}