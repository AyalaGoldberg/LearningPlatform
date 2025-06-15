// src/components/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { TextField, Pagination } from '@mui/material';
import HistoryView from './HistoryView';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';


export default function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalCount, setTotalCount] = useState(0);
    const [search, setSearch] = useState('');
    const [expandedUserId, setExpandedUserId] = useState(null);
    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        fetch(`${API_URL}/api/Users?page=${page}&pageSize=${pageSize}&search=${encodeURIComponent(search)}`)
            .then(res => res.json())
            .then(data => {
                setUsers(data.users);
                setTotalCount(data.totalCount);
            });
    }, [page, pageSize, search]);

    return (

        <Paper elevation={1} sx={{ p: 2, mt: 2 }}>
            <Typography variant="h6" gutterBottom>Admin</Typography>
            <TextField
                label="Search"
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                sx={{ mb: 2 }}
            />

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>User ID</TableCell>
                            <TableCell>User Name</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Prompt Count</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(user => (
                            <React.Fragment key={user.id}>
                                <TableRow style={{ cursor: 'pointer' }}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                    <TableCell>
                                        {user.promptCount}
                                        <IconButton
                                            size="small"
                                            onClick={() =>
                                                setExpandedUserId(expandedUserId === user.id ? null : user.id)
                                            }
                                            sx={{ ml: 1 }} // adds a little space between count and arrow
                                        >
                                            {expandedUserId === user.id ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
                                        <Collapse in={expandedUserId === user.id} timeout="auto" unmountOnExit>
                                            <HistoryView
                                                userId={user.id}
                                                userName={user.name}
                                                onClose={() => setExpandedUserId(null)}
                                            />
                                        </Collapse>
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
 

            <Pagination
                count={Math.ceil(totalCount / pageSize)}
                page={page}
                onChange={(e, value) => setPage(value)}
                sx={{ mt: 2 }}
            />
        </Paper>
    );
}