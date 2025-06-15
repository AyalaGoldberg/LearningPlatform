import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Container, Typography, Box, Paper } from '@mui/material';
import RegisterUser from './components/RegisterUser';
import CategorySelector from './components/CategorySelector';
import PromptForm from './components/PromptForm';
import ResponseView from './components/ResponseView';
import HistoryView from './components/HistoryView';
import AdminDashboard from './components/AdminDashboard';
import UserBar from './components/UserBar';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#00bcd4' },
    background: { default: '#f4f6f8', paper: '#fff' },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: { fontWeight: 700, fontSize: '2.5rem', letterSpacing: '0.05em' },
    h2: { fontWeight: 600, fontSize: '2rem' },
    body1: { fontSize: '1.1rem' },
  },
});

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [subCategoryId, setSubCategoryId] = useState('');
  const [response, setResponse] = useState('');
  const [gptResponse, setGptResponse] = useState('');
  const [categoryName, setCategoryName] = useState('');

  // Called after login/register
  const handleRegister = (id, name, isAdminFlag) => {
    setUserId(id);
    setUserName(name);
    setIsAdmin(isAdminFlag);
    setCategoryId('');
    setSubCategoryId('');
    setResponse('');
  };

  // Called on logout
  const handleLogout = () => {
    setUserId(null);
    setUserName('');
    setCategoryId('');
    setSubCategoryId('');
    setResponse('');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h1" align="center" color="primary" gutterBottom>
            Learning Platform
          </Typography>
          {userId && (
            <UserBar userName={userName} onLogout={handleLogout} />
          )}

          {!userId && <RegisterUser onRegister={handleRegister} />}

          {userId && (
            <>
              <Box sx={{ my: 3 }}>
                <CategorySelector onSelect={({ categoryId, subCategoryId }) => {
                  setCategoryId(categoryId);
                  setSubCategoryId(subCategoryId);
                }} />
              </Box>
              <Box sx={{ my: 3 }}>
                <PromptForm
                  userId={userId}
                  categoryId={categoryId}
                  subCategoryId={subCategoryId}
                  onResponse={data => {
                    setGptResponse(data.response);
                    setCategoryName(data.category);
                  }}
                />
                <ResponseView response={gptResponse} categoryName={categoryName} />
              </Box>
              <Box sx={{ my: 3 }}>
                <HistoryView userId={userId} />
              </Box>
              <Box sx={{ my: 3 }}>
                {isAdmin && <AdminDashboard />}
              </Box>
            </>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;
