import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Container, Typography, List, ListItem, ListItemText, Box, Button } from '@mui/material';

function EntityDetails() {
  const { id } = useParams();
  const [entity, setEntity] = useState(null);

  useEffect(() => {
    const fetchEntity = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:3001/api/entities/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEntity(response.data);
    };

    fetchEntity();
  }, [id]);

  return (
    <Container>
      {entity ? (
        <Box sx={{ mt: 8 }}>
          <Typography component="h1" variant="h5">{entity.name}</Typography>
          <List>
            {entity.components.map((component, index) => (
              <ListItem key={index}>
                <ListItemText primary={`${component.label} (${component.type})`} />
              </ListItem>
            ))}
          </List>
          <Button component={Link} to={`/entities/${id}/add-record`} variant="contained" color="primary">
            Add Record
          </Button>

            {/* lista para mostrar os records dessa entity */}
        <Typography component="h1" variant="h5">Records</Typography>
        <List>
          {entity.records.map((record, index) => (
            <ListItem key={index}>
              { /* gere dinamicamente os campos presentes no record.data ex: object with keys {nome, setor} */  }
              <ListItemText primary={record.data.nome} />
              <ListItemText primary={record.data.setor}
              />

              
              
            </ListItem>
          ))}
        </List>
        </Box>
      ) : (
        <Typography component="h1" variant="h5">Loading...</Typography>
      )}
    </Container>
   );
}

export default EntityDetails;
