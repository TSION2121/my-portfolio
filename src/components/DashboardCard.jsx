// src/components/DashboardCard.jsx
import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Stack, Skeleton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';

const variants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.02, boxShadow: '0 10px 30px rgba(2,6,23,0.08)' },
};

export default function DashboardCard({ title, subtitle, tech = [], to, small = false, loading = false }) {
    const reduce = useReducedMotion();

    if (loading) return <Skeleton variant="rectangular" height={small ? 92 : 140} />;

    const content = (
        <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                    <Typography variant={small ? 'subtitle1' : 'h6'} sx={{ fontWeight: 700 }}>
                        {title}
                    </Typography>
                    {subtitle && (
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            {subtitle}
                        </Typography>
                    )}
                </Box>
            </Box>

            {tech && tech.length > 0 && (
                <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap' }}>
                    {tech.slice(0, 6).map((t) => (
                        <Chip key={t} label={t} size="small" />
                    ))}
                </Stack>
            )}
        </CardContent>
    );

    const Wrapper = to ? RouterLink : 'div';
    return (
        <motion.div variants={variants} initial="hidden" animate="visible" whileHover={reduce ? {} : 'hover'}>
            <Card component={Wrapper} to={to} sx={{ height: '100%', textDecoration: 'none' }}>
                {content}
            </Card>
        </motion.div>
    );
}
