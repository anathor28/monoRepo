import React from 'react';
import { Card, CardContent, Typography, Icon } from '@mui/material';

interface InfoCardProps {
    icon: string;
    title: string;
    content: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, content }) => {
    return (
        <Card>
            <CardContent>
                <Icon>{icon}</Icon>
                <Typography variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2">
                    {content}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default InfoCard;