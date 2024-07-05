import React from 'react';
import { Container, Typography, Box } from '@mui/material';

function Home() {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to the Entity Management System
        </Typography>
        <Typography variant="body1">
          Use the navigation bar to login, register, view entities, or create a new entity.
        </Typography>
      </Box>
    </Container>
  );
}

export default Home;
