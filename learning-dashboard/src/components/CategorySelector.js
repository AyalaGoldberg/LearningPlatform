// src/components/CategorySelector.js
import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Stack, Paper, Typography } from '@mui/material';

export default function CategorySelector({ onSelect }) {
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [subCategoryId, setSubCategoryId] = useState('');
    const API_URL = process.env.REACT_APP_API_URL;


    useEffect(() => {
        fetch(`${API_URL}/api/categories`)
            .then(res => res.json())
            .then(setCategories);
    }, []);

    useEffect(() => {
        if (categoryId) {
            fetch(`${API_URL}/api/subcategories?categoryId=${categoryId}`)
                .then(res => res.json())
                .then(setSubCategories);
        }
    }, [categoryId]);

    useEffect(() => {
        if (onSelect) onSelect({ categoryId, subCategoryId });
    }, [categoryId, subCategoryId, onSelect]);

    return (

        <Paper elevation={1} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Select What You Want to Learn</Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                        value={categoryId}
                        label="Category"
                        onChange={e => setCategoryId(e.target.value)}
                    >
                        <MenuItem value=""><em>Select Category</em></MenuItem>
                        {categories.map(c => (
                            <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth disabled={!categoryId}>
                    <InputLabel>Sub-Category</InputLabel>
                    <Select
                        value={subCategoryId}
                        label="Sub-Category"
                        onChange={e => setSubCategoryId(e.target.value)}
                    >
                        <MenuItem value=""><em>Select Sub-Category</em></MenuItem>
                        {subCategories.map(sc => (
                            <MenuItem key={sc.id} value={sc.id}>{sc.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Stack>
        </Paper>
    );
}