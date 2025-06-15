// src/components/ResponseView.js
import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

export default function ResponseView({ response, categoryName }) {
    if (!response) return null;
    return (

        <Paper elevation={1} sx={{ p: 2, mt: 2 }}>
            <Typography variant="h6" gutterBottom>AI Response</Typography>
            {categoryName && (
                <Typography variant="subtitle2" color="primary">
                    Category: {categoryName}
                </Typography>
            )}
            <Box
                sx={{
                    maxHeight: 250,
                    overflowY: 'auto',
                    backgroundColor: '#f9f9f9',
                    p: 1,
                    borderRadius: 1,
                    mt: 1,
                }}
            >
                <Typography variant="body1">
                    {response}
                </Typography>
            </Box>

        </Paper>
    );
}