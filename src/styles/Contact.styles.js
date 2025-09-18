import styled from 'styled-components';
import { TextField, Button } from '@mui/material';

export const ContactSection = styled.section`
    padding: 4rem 2rem;
    background-color: ${({ theme }) => theme.palette.background.paper};

    @media (max-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
        padding: 2rem 1rem;
    }
`;

export const SectionTitle = styled.h2`
    font-size: 2.5rem;
    color: ${({ theme }) => theme.palette.primary.main};
    margin-bottom: 2rem;
    text-align: center;

    @media (max-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
        font-size: 2rem;
    }
`;

export const ContactForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    max-width: 350px; /* Further reduced width for a smaller form */
    margin: 0 auto;
`;

export const StyledTextField = styled(TextField)`
    width: 100%;
    & .MuiOutlinedInput-root {
        border-radius: 4px;
    }
`;

export const SubmitButton = styled(Button)`
    padding: 0.75rem 1.5rem;
    background-color: ${({ theme }) => theme.palette.primary.main};
    color: white;
    &:hover {
        background-color: ${({ theme }) => theme.palette.primary.dark};
    }
`;