// src/components/PromptForm.js
import React, { useState } from 'react';
import { TextField, Button, Stack, Paper, Typography } from '@mui/material';

export default function PromptForm({ userId, categoryId, subCategoryId, onResponse }) {
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const API_URL = process.env.REACT_APP_API_URL;
            const res = await fetch(`${API_URL}/api/ai/createNewLesson`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId,
                    categoryId,
                    subCategoryId,
                    promptText: prompt
                })
            });

            // Always read as JSON, even for errors
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Failed to get GPT response');
            }

            onResponse(data); // Use the full data object returned by the API
            setPrompt('');
        } catch (err) {
            alert('Network error: ' + err.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <Paper elevation={1} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Send a Prompt</Typography>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <TextField
                        label="Your Prompt"
                        value={prompt}
                        onChange={e => setPrompt(e.target.value)}
                        required
                        multiline
                        minRows={3}
                        fullWidth
                    />
                    <Button type="submit" variant="contained" color="secondary" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit'}
                    </Button>
                </Stack>
            </form>
        </Paper>
    );
}