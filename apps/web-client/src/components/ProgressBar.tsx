import React from 'react';
import { LinearProgress, Typography, Box } from '@mui/material';

interface ProgressBarProps {
    value: number;
    label: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, label }) => {
    return (
        <Box display="flex" alignItems="center">
            <Box width="100%" mr={1}>
                <LinearProgress variant="determinate" value={value} />
            </Box>
            <Box minWidth={35}>
                <Typography variant="body2" color="textSecondary">{`${Math.round(
                    value,
                )}%`}</Typography>
            </Box>
            <Typography variant="body2" color="textSecondary">{label}</Typography>
        </Box>
    );
};

export default ProgressBar;