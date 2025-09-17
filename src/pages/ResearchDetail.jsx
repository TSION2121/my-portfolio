// src/pages/ResearchDetail.jsx
import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import PageWrapper from '../components/PageWrapper';
import { Container, Stack } from '@mui/material';
import db from '../../db.json'; // Directly import the JSON data

const ResearchDetail = () => {
    const { id } = useParams();

    // Find the research item directly from the imported JSON
    const item = useMemo(() => {
        return db.research.find(research => research.id === id);
    }, [id]);

    if (!item) {
        return (
            <PageWrapper>
                <Container maxWidth="md" sx={{ py: 6, textAlign: 'center' }}>
                    <Typography variant="h4" gutterBottom>Research Item Not Found</Typography>
                    <Typography variant="body1" color="text.secondary">
                        The research you're looking for doesn't exist.
                    </Typography>
                    <Button component={Link} to="/research" variant="contained" sx={{ mt: 2 }}>
                        Back to all Research
                    </Button>
                </Container>
            </PageWrapper>
        );
    }

    return (
        <PageWrapper>
            <Container maxWidth="md" sx={{ py: 6 }}>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 800 }}>{item.title}</Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontStyle: 'italic', mt: 1, mb: 2 }}>
                    {item.authors.join(', ')}
                </Typography>

                <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: 'wrap' }}>
                    {item.keywords.map((keyword, index) => (
                        <Chip key={index} label={keyword} />
                    ))}
                </Stack>

                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', mb: 3 }}>
                    {item.abstract}
                </Typography>

                <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
                    {item.pdf && (
                        <Button href={item.pdf} target="_blank" rel="noopener noreferrer" variant="contained">
                            Download PDF
                        </Button>
                    )}
                    {item.link && (
                        <Button href={item.link} target="_blank" rel="noopener noreferrer" variant="outlined">
                            View External Link
                        </Button>
                    )}
                </Stack>

                <Box sx={{ mt: 4, pt: 2, borderTop: 1, borderColor: 'divider' }}>
                    <Button component={Link} to="/research" variant="text">
                        ← Back to all Research
                    </Button>
                </Box>
            </Container>
        </PageWrapper>
    );
};

export default ResearchDetail;