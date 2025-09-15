import React from 'react';
import Research from '../components/Research/Research'; // component from earlier Research.jsx
import { motion } from 'framer-motion';

const ResearchPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.32 }}
        >
            <Research />
        </motion.div>
    );
};

export default ResearchPage;
