import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Typography, List, ListItem, ListItemText, Box, Button } from '@mui/material';

function Entities() {
  const [entities, setEntities] = useState([]);

  useEffect(() => {
    const fetchEntities = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3001/api/entities', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEntities(response.data);
    };

    fetchEntities();
  }, []);

  return (
    <Container>
      <Box sx={{ mt: 8 }}>
        <Typography component="h1" variant="h5">Entities</Typography>
        <Button component={Link} to="/create-entity" variant="contained" color="primary" sx={{ mb: 2 }}>
          Create New Entity
        </Button>
        <List>
          {entities.map((entity) => (
            <ListItem button component={Link} to={`/entities/${entity._id}`} key={entity._id}>
              <ListItemText primary={entity.name} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
   );
}

export default Entities;
