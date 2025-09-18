// src/components/Research.jsx
import React, { useState, useMemo } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import { motion } from 'framer-motion';
import { ResearchSection, ResearchCard } from '../styles/Research.styles';
import { Link } from 'react-router-dom';
import db from '../../db.json'; // Directly import the JSON data

const Research = () => {
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 6;
    const researchItems = db.research;

    const filteredItems = useMemo(() => {
        if (!search) {
            return researchItems;
        }
        const lowerCaseSearch = search.toLowerCase();
        return researchItems.filter(item =>
            item.title.toLowerCase().includes(lowerCaseSearch) ||
            item.abstract.toLowerCase().includes(lowerCaseSearch) ||
            (item.keywords && item.keywords.some(keyword => keyword.toLowerCase().includes(lowerCaseSearch))) ||
            (item.authors && item.authors.some(author => author.toLowerCase().includes(lowerCaseSearch)))
        );
    }, [search, researchItems]);

    const totalPages = Math.ceil(filteredItems.length / perPage);
    const paginatedItems = filteredItems.slice((currentPage - 1) * perPage, currentPage * perPage);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 18 },
        visible: { opacity: 1, y: 0 },
        hover: { scale: 1.02, boxShadow: '0 8px 28px rgba(0,0,0,0.08)' },
    };

    if (!researchItems || researchItems.length === 0) {
        return (
            <ResearchSection id="research">
                <Typography variant="h6" color="error" align="center">No research items found in the data.</Typography>
            </ResearchSection>
        );
    }

    return (
        <ResearchSection id="research">
            <Typography variant="h5" align="center" gutterBottom>Research & Publications</Typography>
            <Box sx={{ maxWidth: 720, mx: 'auto', mb: 2 }}>
                <TextField
                    fullWidth
                    size="small"
                    label="Search publications"
                    placeholder="e.g., lunar habitat, MBSE, calibration"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    inputProps={{ 'aria-label': 'Search research publications' }}
                />
            </Box>
            {filteredItems.length > 0 ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 1100, margin: '0 auto' }}>
                    {paginatedItems.map((r, idx) => (
                        <motion.div key={r.id}
                                    variants={cardVariants}
                                    initial="hidden"
                                    animate="visible"
                                    whileHover="hover"
                                    transition={{ duration: 0.32, delay: idx * 0.03 }}
                        >
                            <Link to={`/research/${r.id}`} style={{ textDecoration: 'none' }}>
                                <ResearchCard>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
                                        <Box sx={{ flex: 1, minWidth: 220 }}>
                                            <Typography variant="h6">{r.title}</Typography>
                                            {r.authors && <Typography variant="body2" color="text.secondary">{r.authors.join(', ')}</Typography>}
                                        </Box>
                                        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                                            {(r.keywords || []).slice(0, 6).map((k) => <Chip key={k} label={k} size="small" />)}
                                        </Stack>
                                    </Box>
                                </ResearchCard>
                            </Link>
                        </motion.div>
                    ))}
                </Box>
            ) : (
                <Box sx={{ textAlign: 'center', py: 6 }}>
                    <Typography variant="h6" color="text.secondary">No research items found matching your criteria.</Typography>
                </Box>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    siblingCount={1}
                    boundaryCount={1}
                    showFirstButton
                    showLastButton
                    aria-label="Research pages"
                />
            </Box>
        </ResearchSection>
    );
};

export default Research;