import styled from 'styled-components';
import { Box, Paper } from '@mui/material';

export const ResearchSection = styled(Box)(({ theme }) => ({
    padding: theme.spacing(4, 2),
    maxWidth: 1100,
    margin: '0 auto',
    background: theme.palette.mode === 'dark' ? 'transparent' : '#fff',
}));

export const ResearchCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    transition: 'transform 0.18s ease, box-shadow 0.18s ease',
    display: 'block',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: theme.shadows[6],
    },
}));