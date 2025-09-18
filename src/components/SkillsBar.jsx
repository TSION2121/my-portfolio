// src/components/SkillsBar.jsx
import React, { useState, useMemo } from 'react';
import {
    Box,
    Grid,
    Typography,
    Stack,
    Pagination,
    useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { SkillsBarSection, SkillBarContainer, SkillBarFill } from '../styles/SkillsBar.styles';
import { FaTerminal } from 'react-icons/fa';

// Framer motion variants for staggered animations
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
    },
};

const SkillItem = ({ skill }) => {
    return (
        <motion.div variants={itemVariants}>
            <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{
                    p: 1.5,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 1,
                    transition: 'transform 0.2s',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 3,
                    },
                }}
            >
                <Box
                    sx={{
                        fontSize: 24,
                        color: 'primary.main',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    {skill.icon || <FaTerminal />}
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Typography variant="body1" fontWeight="bold">
                            {skill.name}
                        </Typography>
                    </Stack>
                    <SkillBarContainer>
                        <SkillBarFill level={skill.level} />
                    </SkillBarContainer>
                </Box>
            </Stack>
        </motion.div>
    );
};

const SkillsBar = ({ title, allSkills }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const perPage = isMobile ? 6 : 8;
    const [currentPage, setCurrentPage] = useState(1);

    const paginatedSkills = useMemo(() => {
        const startIndex = (currentPage - 1) * perPage;
        return allSkills.slice(startIndex, startIndex + perPage);
    }, [allSkills, currentPage, perPage]);

    const totalPages = Math.ceil(allSkills.length / perPage);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <SkillsBarSection>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" component="h2" sx={{ fontWeight: 800 }}>
                    {title}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                    Skills derived from my projects and research.
                </Typography>
            </Box>
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
                <Grid container spacing={3}>
                    {paginatedSkills.map((skill) => (
                        <Grid item xs={12} sm={6} md={4} key={skill.name}>
                            <SkillItem skill={skill} />
                        </Grid>
                    ))}
                </Grid>
            </motion.div>
            {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                        siblingCount={1}
                        boundaryCount={1}
                        showFirstButton
                        showLastButton
                        aria-label="Skills pages"
                    />
                </Box>
            )}
        </SkillsBarSection>
    );
};

export default SkillsBar;