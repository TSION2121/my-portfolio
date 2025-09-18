import styled from '@emotion/styled';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

export const ResearchSection = styled('section')(({ theme }) => ({
    padding: theme.spacing(4, 2),
    maxWidth: 1100,
    margin: '0 auto',
    background: theme.palette.mode === 'dark' ? 'transparent' : '#fff',
    // Responsive padding for smaller screens
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2, 1),
    },
}));

// This new component will handle the responsive grid layout
export const ResearchGrid = styled('div')(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: theme.spacing(4),
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
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
}));