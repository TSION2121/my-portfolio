import React, { useState, useMemo } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import { motion } from 'framer-motion';
import { ResearchSection, ResearchCard, ResearchGrid, ResearchHeader, ResearchCardLeft, ResearchMeta } from '../styles/Research.styles';
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

    const paginatedItems = useMemo(() => {
        const startIndex = (currentPage - 1) * perPage;
        return filteredItems.slice(startIndex, startIndex + perPage);
    }, [filteredItems, currentPage, perPage]);

    const totalPages = Math.ceil(filteredItems.length / perPage);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const truncateAbstract = (abstract, limit) => {
        const words = abstract.split(' ');
        if (words.length > limit) {
            return words.slice(0, limit).join(' ') + '...';
        }
        return abstract;
    };

    return (
        <ResearchSection>
            <ResearchHeader>
                <Typography variant="h4" component="h1" gutterBottom>
                    Research & Publications
                </Typography>
                <Box>
                    <TextField
                        label="Search"
                        variant="outlined"
                        size="small"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1); // Reset to the first page on new search
                        }}
                    />
                </Box>
            </ResearchHeader>

            {filteredItems.length > 0 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                    <ResearchGrid>
                        {paginatedItems.map((r, index) => (
                            <motion.div
                                key={r.id}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                <Link to={`/research/${r.id}`} style={{ textDecoration: 'none' }}>
                                    <ResearchCard elevation={3}>
                                        <Typography variant="h6" sx={{ fontWeight: 600 }}>{r.title}</Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                            {truncateAbstract(r.abstract, 30)}
                                        </Typography>
                                        <ResearchMeta>
                                            <ResearchCardLeft>
                                                {r.authors && <Typography variant="body2" color="text.secondary">Authors: {r.authors.join(', ')}</Typography>}
                                            </ResearchCardLeft>
                                            <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                                                {(r.keywords || []).map((k) => <Chip key={k} label={k} size="small" />)}
                                            </Stack>
                                        </ResearchMeta>
                                    </ResearchCard>
                                </Link>
                            </motion.div>
                        ))}
                    </ResearchGrid>
                </motion.div>
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