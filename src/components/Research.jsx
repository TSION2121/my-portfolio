import React, { useEffect, useState, useMemo } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
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
    const paginatedItems = useMemo(() => {
        const startIndex = (currentPage - 1) * perPage;
        return filteredItems.slice(startIndex, startIndex + perPage);
    }, [filteredItems, currentPage, perPage]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <ResearchSection>
            <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 800 }}>
                    My Research
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                    Publications, technical papers, and academic work.
                </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
                <TextField
                    label="Search Research"
                    variant="outlined"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }}
                    sx={{ width: '100%' }}
                />
            </Box>

            {paginatedItems.length > 0 ? (
                <Box component={motion.div} initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
                    {paginatedItems.map((r) => (
                        <motion.div key={r.id} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                            <Link to={`/research/${r.id}`} style={{ textDecoration: 'none' }}>
                                <ResearchCard sx={{ mb: 2 }}>
                                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'flex-start', gap: 2 }}>
                                        <Box sx={{ flexGrow: 1 }}>
                                            <Typography variant="h6" sx={{ fontWeight: 700 }}>{r.title}</Typography>
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