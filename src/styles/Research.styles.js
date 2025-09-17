// src/styles/Research.styles.js
import styled from '@emotion/styled';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

export const ResearchSection = styled('section')(({ theme }) => ({
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

export const ResearchHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(2),
    flexWrap: 'wrap',
}));

export const ResearchMeta = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    flexWrap: 'wrap',
    marginTop: theme.spacing(1),
}));

export const ResearchCardLeft = styled(Box)(({ theme }) => ({
    flex: 1,
    minWidth: 220,
}));

export const ResearchCardRight = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: theme.spacing(1),
    width: 240,
    [theme.breakpoints.down('sm')]: {
        alignItems: 'flex-start',
        width: '100%',
    },
}));
