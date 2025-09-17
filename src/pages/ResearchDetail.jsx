import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import { ResearchSection, ResearchCard } from '../styles/Research.styles';
import db from '../../db.json'; // Directly import the JSON data
import PageWrapper from '../components/PageWrapper';
import Footer from '../components/Footer';

const ResearchDetail = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);

    useEffect(() => {
        const foundItem = db.research.find(r => r.id === id);
        setItem(foundItem);
    }, [id]);

    if (!item) {
        return (
            <PageWrapper>
                <Box sx={{ p: 4, textAlign: 'center' }}>
                    <Typography variant="h4" color="error">Research item not found.</Typography>
                    <Button component={Link} to="/research" variant="text" sx={{ mt: 2 }}>Back to Research</Button>
                </Box>
                <Footer />
            </PageWrapper>
        );
    }

    return (
        <PageWrapper>
            <ResearchSection>
                <ResearchCard>
                    <Typography variant="h4" gutterBottom>{item.title}</Typography>
                    {item.authors && <Typography variant="subtitle2" color="textSecondary" gutterBottom>Authors: {item.authors.join(', ')}</Typography>}
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                        {(item.keywords || []).map((k) => <Chip key={k} label={k} size="small" />)}
                    </Box>

                    <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', mb: 2 }}>
                        {item.abstract || 'No abstract available.'}
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {item.pdf && <Button variant="outlined" href={item.pdf} target="_blank" rel="noopener">Download PDF</Button>}
                        {item.link && <Button variant="contained" href={item.link} target="_blank" rel="noopener">External Link</Button>}
                        <Button component={Link} to="/research" variant="text">Back to Research</Button>
                    </Box>
                </ResearchCard>
            </ResearchSection>
            <Footer />
        </PageWrapper>
    );
};

export default ResearchDetail;