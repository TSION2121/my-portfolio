// src/pages/Home.jsx
import React, { useMemo } from 'react';
import {
    Container,
    Box,
    Typography,
    Grid,
    Stack,
    Button,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import DashboardCard from '../components/DashboardCard';
import SkillsBar from '../components/SkillsBar';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import db from '../../db.json';
import {
    FaReact,
    FaNodeJs,
    FaPython,
    FaJava,
    FaGitAlt,
    FaDocker,
    FaBootstrap,
    FaHtml5,
    FaCss3Alt,
    FaTerminal,
    FaCogs,
    FaEye,
    FaPaintBrush,
} from 'react-icons/fa';
import {
    SiExpress,
    SiTypescript,
    SiMysql,
    SiMongodb,
    SiStyledcomponents,
    SiFramer,
    SiCplusplus,
    SiR,
    SiRos,
    SiKubernetes,
} from 'react-icons/si';

// Map skill names to a react-icons component
const SKILL_ICONS = {
    'React': <FaReact />,
    'JavaScript (ES6+)': <FaNodeJs />,
    'TypeScript': <SiTypescript />,
    'Node.js': <FaNodeJs />,
    'Express.js': <SiExpress />,
    'Python': <FaPython />,
    'Java': <FaJava />,
    'Spring Boot': <FaJava />,
    'MySQL': <SiMysql />,
    'MongoDB': <SiMongodb />,
    'Material UI': <FaPaintBrush />,
    'Styled Components': <SiStyledcomponents />,
    'Git': <FaGitAlt />,
    'Docker': <FaDocker />,
    'Kubernetes': <SiKubernetes />,
    'Framer Motion': <SiFramer />,
    'CI/CD': <FaCogs />,
    'Computer Vision': <FaEye />,
    'MBSE': <SiRos />,
    'Valispace': <SiRos />,
    'HTML': <FaHtml5 />,
    'CSS': <FaCss3Alt />,
    'Bootstrap': <FaBootstrap />,
    'Thymeleaf': <FaHtml5 />,
    'C++': <SiCplusplus />,
    'R': <SiR />,
    'ROS': <SiRos />,
};

// Function to dynamically calculate skill levels from the database
const getSkillsWithLevels = (data) => {
    const skillCounts = {};
    let maxCount = 0;

    data.projects.forEach(project => {
        (project.techStack || []).forEach(tech => {
            const normalizedTech = tech.toLowerCase().trim();
            skillCounts[normalizedTech] = (skillCounts[normalizedTech] || 0) + 1;
        });
    });

    data.research.forEach(research => {
        (research.keywords || []).forEach(keyword => {
            const normalizedKeyword = keyword.toLowerCase().trim();
            skillCounts[normalizedKeyword] = (skillCounts[normalizedKeyword] || 0) + 1;
        });
    });

    for (const skill in skillCounts) {
        if (skillCounts[skill] > maxCount) {
            maxCount = skillCounts[skill];
        }
    }

    const skillsWithLevels = Object.keys(skillCounts).map(skill => {
        const displayName = skill.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        return {
            name: displayName,
            level: Math.round((skillCounts[skill] / maxCount) * 100),
            icon: SKILL_ICONS[displayName] || <FaTerminal />,
        };
    }).sort((a, b) => b.level - a.level);

    return skillsWithLevels;
};

// Framer motion variants for staggered animations
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
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

export default function Home() {
    const projects = db.projects;
    const research = db.research;
    const combinedRecentWork = useMemo(() => {
        const sortedProjects = [...projects].sort((a, b) => b.id.localeCompare(a.id));
        const sortedResearch = [...research].sort((a, b) => b.id.localeCompare(a.id));
        const featuredItems = [];
        let i = 0;
        let j = 0;
        for (let k = 0; k < 6; k++) {
            if (k % 2 === 0 && i < sortedProjects.length && i < 3) {
                featuredItems.push({ ...sortedProjects[i], type: 'project' });
                i++;
            } else if (j < sortedResearch.length && j < 3) {
                featuredItems.push({ ...sortedResearch[j], type: 'research' });
                j++;
            }
        }
        return featuredItems;
    }, [projects, research]);
    const allSkills = useMemo(() => getSkillsWithLevels(db), [db]);
    return (
        <PageWrapper>
            <Helmet>
                <title>Tsion Bizuayehu — Portfolio</title>
                <meta name="description" content="Welcome to the personal portfolio of Tsion Bizuayehu, a Senior Software Engineer specializing in backend systems, computer vision, and AI/ML research." />
            </Helmet>
            <Hero />
            <Container maxWidth="lg" sx={{ py: 6 }}>
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" component="h2" sx={{ fontWeight: 800 }}>
                        Recent Work
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                        A showcase of recent projects and research, hand-picked for their significance.
                    </Typography>
                </Box>
                <motion.div variants={containerVariants} initial="hidden" animate="visible">
                    <Grid container spacing={4}>
                        {combinedRecentWork.map((item) => (
                            <Grid item xs={12} sm={6} md={4} key={item.id} component={motion.div} variants={itemVariants}>
                                <DashboardCard
                                    title={item.title}
                                    subtitle={item.description || item.abstract}
                                    to={item.type === 'project' ? `/projects/${item.id}` : `/research/${item.id}`}
                                    tech={item.techStack || item.keywords}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </motion.div>
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Button component={RouterLink} to="/projects" variant="contained" size="large">
                        View All Work
                    </Button>
                </Box>
            </Container>
            <Container maxWidth="lg" sx={{ py: 6 }}>
                <SkillsBar title="Tech Stack & Skills" allSkills={allSkills} />
            </Container>
            <Container maxWidth="lg" sx={{ py: 6 }}>
                <Box sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 2 }}>
                    <Stack
                        direction={{ xs: 'column', md: 'row' }}
                        alignItems={{ xs: 'flex-start', md: 'center' }}
                        justifyContent="space-between"
                        spacing={2}
                    >
                        <Box>
                            <Typography variant="h6">Ready to collaborate?</Typography>
                            <Typography variant="body2" color="text.secondary">
                                Explore projects, read technical notes, or request a walkthrough.
                            </Typography>
                        </Box>
                        <Stack direction="row" spacing={2}>
                            <Button component={RouterLink} to="/projects" variant="contained">
                                View projects
                            </Button>
                            <Button component={RouterLink} to="/contact" variant="outlined">
                                Contact
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Container>
            <Footer />
        </PageWrapper>
    );
}