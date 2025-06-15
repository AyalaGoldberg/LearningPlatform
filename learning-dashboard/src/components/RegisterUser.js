import React, { useState } from 'react';
import { TextField, Button, Stack, Paper, Typography } from '@mui/material';

export default function RegisterUser({ onRegister }) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
    const API_URL = process.env.REACT_APP_API_URL;

        let res = await fetch(`${API_URL}/api/Users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, phone })
        });
        if (!res.ok) {
            alert('Failed to register user.');
            return;
        }
        // Get the real user object from the backend
        let user = await res.json();
        onRegister(user.id, user.name, user.isAdmin);
        setName('');
        setPhone('');
    };

    return (
        <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>Login / Register</Typography>
            <form onSubmit={handleSubmit}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                        label="Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                        fullWidth
                    />
                    <TextField
                        label="Phone"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        required
                        fullWidth
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Login / Register
                    </Button>
                </Stack>
            </form>
        </Paper>
    );
}