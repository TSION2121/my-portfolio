import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack'; // Import Stack
import IconButton from '@mui/material/IconButton'; // Import IconButton
import Tooltip from '@mui/material/Tooltip'; // Import Tooltip
import ContentCopyIcon from '@mui/icons-material/ContentCopy'; // Import copy icon
import { ResearchSection, ResearchCard } from '../styles/Research.styles';
import db from '../../db.json';
import PageWrapper from '../components/PageWrapper';
import Footer from '../components/Footer';

const ResearchDetail = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);

    useEffect(() => {
        const foundItem = db.research.find(r => r.id === id);
        setItem(foundItem);
    }, [id]);

    const handleCopyAbstract = () => {
        if (item && item.abstract) {
            navigator.clipboard.writeText(item.abstract)
                .then(() => {
                    alert('Abstract copied to clipboard!');
                })
                .catch(err => {
                    console.error('Failed to copy abstract: ', err);
                });
        }
    };

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
                    <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>{item.title}</Typography>
                    {item.authors && <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ fontStyle: 'italic' }}>Authors: {item.authors.join(', ')}</Typography>}

                    {item.publication && (
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            **Published in:** {item.publication}
                        </Typography>
                    )}
                    {item.publicationDate && (
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            **Date:** {item.publicationDate}
                        </Typography>
                    )}

                    {/* Responsive Chip layout */}
                    <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', my: 2 }}>
                        {(item.keywords || []).map((k) => <Chip key={k} label={k} size="small" />)}
                    </Stack>

                    <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 1, fontWeight: 600 }}>Abstract</Typography>
                    <Box sx={{ position: 'relative', mb: 2 }}>
                        <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                            {item.abstract || 'No abstract available.'}
                        </Typography>
                        {/*{item.abstract && (*/}
                        {/*    <Tooltip title="Copy abstract" placement="right">*/}
                        {/*        <IconButton*/}
                        {/*            onClick={handleCopyAbstract}*/}
                        {/*            aria-label="copy abstract"*/}
                        {/*            size="small"*/}
                        {/*            sx={{ position: 'absolute', top: 0, right: 0 }}*/}
                        {/*        >*/}
                        {/*            <ContentCopyIcon fontSize="inherit" />*/}
                        {/*        </IconButton>*/}
                        {/*    </Tooltip>*/}
                        {/*)}*/}
                    </Box>

                    {/* Responsive Button layout */}
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ mt: 4, flexWrap: 'wrap' }}>
                        {item.pdf && (
                            <Button variant="outlined" href={item.pdf} target="_blank" rel="noopener">
                                Download PDF
                            </Button>
                        )}
                        {item.link && (
                            <Button variant="contained" href={item.link} target="_blank" rel="noopener">
                                External Link
                            </Button>
                        )}
                        <Button component={Link} to="/research" variant="text">
                            Back to Research
                        </Button>
                    </Stack>
                </ResearchCard>
            </ResearchSection>
            <Footer />
        </PageWrapper>
    );
};

export default ResearchDetail;