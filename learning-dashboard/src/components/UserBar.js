import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

export default function UserBar({ userName, onLogout }) {
    return (
        <AppBar position="static" color="default" elevation={1} sx={{ mb: 3 }}>
            <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" color="primary">
                        {userName ? `Welcome ${userName}!` : ''}
                    </Typography>
                </Box>
                <Button color="secondary" variant="outlined" onClick={onLogout}>
                    Log out
                </Button>
            </Toolbar>
        </AppBar>
    );
}