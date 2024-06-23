import React from 'react';
import { Card, CardContent, Typography, LinearProgress } from '@mui/material';

interface GoalCardProps {
    title: string;
    currentAmount: number;
    targetAmount: number;
}

const GoalCard: React.FC<GoalCardProps> = ({ title, currentAmount, targetAmount }) => {
    const progress = (currentAmount / targetAmount) * 100;

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {`${currentAmount} € / ${targetAmount} €`}
                </Typography>
                <LinearProgress variant="determinate" value={progress} />
            </CardContent>
        </Card>
    );
};

export default GoalCard;