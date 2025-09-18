import React, { useMemo } from 'react';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { AboutSection } from '../styles/About.styles';
import { motion } from 'framer-motion';
import db from '../../db.json';

const About = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const allSkills = useMemo(() => {
        const skillsSet = new Set();
        db.projects.forEach(project => {
            (project.techStack || []).forEach(skill => {
                skillsSet.add(skill);
            });
        });
        return Array.from(skillsSet);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
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

    return (
        <AboutSection id="about">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <motion.div variants={itemVariants}>
                    <Typography
                        variant={isMobile ? 'h5' : 'h4'}
                        component="h2"
                        gutterBottom
                        align="center"
                    >
                        About Me
                    </Typography>
                    <Typography
                        variant={isMobile ? 'body2' : 'body1'}
                        color="textPrimary"
                        align="center"
                    >
                        I am a software engineer with over 5 years of experience, consistently delivering high-quality solutions across full-stack development and AI projects. My expertise spans front-end and back-end technologies, UI/UX design, and database engineering. I have a strong foundation in Python, JavaScript, and Java, and I am passionate about leveraging AI for innovative solutions.
                    </Typography>
                </motion.div>

                <motion.div variants={itemVariants} style={{ marginTop: '3rem' }}>
                    <Typography
                        variant={isMobile ? 'h6' : 'h5'}
                        component="h3"
                        gutterBottom
                        align="center"
                    >
                        Skills & Technologies
                    </Typography>
                    <Stack
                        direction="row"
                        justifyContent="center"
                        flexWrap="wrap"
                        gap={1}
                        component={motion.div}
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {allSkills.map((skill, index) => (
                            <motion.div key={index} variants={itemVariants}>
                                <Chip
                                    label={skill}
                                    color="primary"
                                    variant="outlined"
                                    sx={{
                                        fontWeight: 'bold',
                                        transition: 'transform 0.2s ease-in-out',
                                        '&:hover': {
                                            transform: 'scale(1.1)',
                                        },
                                    }}
                                />
                            </motion.div>
                        ))}
                    </Stack>
                </motion.div>
            </motion.div>
        </AboutSection>
    );
};

export default About;