// src/components/HistoryView.js
import React, { useEffect, useState } from 'react';
import { Paper, Typography, List, ListItem, ListItemText, Divider, Box } from '@mui/material';
import { TextField, Pagination } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';


export default function HistoryView({ userId, userName }) {
    const [history, setHistory] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(5);

    const [totalCount, setTotalCount] = useState(0);
    const [open, setOpen] = useState(true);

    useEffect(() => {
        if (!userId) return;
        const API_URL = process.env.REACT_APP_API_URL;
        fetch(`${API_URL}/api/prompts?userId=${userId}&page=${page}&pageSize=${pageSize}`)
            .then(res => {
                const contentType = res.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    return res.json();
                } else {
                    return res.text().then(text => { throw new Error(text); });
                }
            })
            .then(data => {
                setHistory(data.prompts || []);
                setTotalCount(data.totalCount || 0);
            })
            .catch(err => {
                console.error("Failed to load prompts:", err);
            });
    }, [userId, page, pageSize]);

    if (!userId) return null;

    return (

        <Paper elevation={1} sx={{ p: 2, mt: 2, position: 'relative' }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                Learning History{userName ? ` of ${userName}` : ''}
                <IconButton
                    size="small"
                    onClick={() => setOpen(!open)}
                    sx={{ ml: 1 }}
                >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </Typography>
            <Collapse in={open}>
                    <List>
                        {history.map((item, idx) => (
                            <React.Fragment key={item.id}>
                                <ListItem alignItems="flex-start" sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                                    {/* 1. Date & Time */}
                                    <Typography variant="caption" color="text.secondary">
                                        {new Date(item.createdAt).toLocaleString()}
                                    </Typography>
                                    {/* 2. Category & Subcategory */}
                                    <Typography variant="subtitle2" color="primary">
                                        {item.categoryName}
                                        {item.subCategoryName ? ` / ${item.subCategoryName}` : ''}
                                    </Typography>
                                    {/* 3. Prompt */}
                                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                                        <b>Prompt:</b> {item.promptText}
                                    </Typography>
                                    {/* 4. Response (Lesson content, scrollable if long) */}
                                    <Box
                                        sx={{
                                            maxHeight: 120,
                                            overflowY: 'auto',
                                            backgroundColor: '#f9f9f9',
                                            p: 1,
                                            borderRadius: 1,
                                            mt: 1,
                                            width: '100%',
                                        }}
                                    >
                                        <Typography variant="body2">
                                            <b>Lesson content:</b> {item.response}
                                        </Typography>
                                    </Box>
                                </ListItem>
                                {idx < history.length - 1 && <Divider />}
                            </React.Fragment>
                        ))}
                    </List>
                <Pagination
                    count={Math.ceil(totalCount / pageSize)}
                    page={page}
                    onChange={(e, value) => setPage(value)}
                    sx={{ mt: 2 }}
                />
            </Collapse>
        </Paper>
    );
}