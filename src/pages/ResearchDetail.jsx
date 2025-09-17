import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import { ResearchSection, ResearchCard } from '../styles/Research.styles';

const ResearchDetail = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:4000/research/${id}`)
            .then((r) => {
                if (!r.ok) throw new Error('Network response not ok');
                return r.json();
            })
            .then((data) => {
                setItem(data);
                setLoading(false);
            })
            .catch((e) => {
                console.error(e);
                setError(true);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <Box sx={{ p: 4, textAlign: 'center' }}><CircularProgress /></Box>;
    if (error || !item) return <Box sx={{ p: 4, textAlign: 'center' }}><Typography color="error">Research item not found.</Typography></Box>;

    return (
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
    );
};

export default ResearchDetail;
