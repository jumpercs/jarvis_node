import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Typography, List, ListItem, ListItemText, Box, Button } from '@mui/material';

function WorkflowList() {
  const [workflows, setWorkflows] = useState([]);

  useEffect(() => {
    const fetchWorkflows = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3001/api/workflows', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWorkflows(response.data);
    };

    fetchWorkflows();
  }, []);

  return (
    <Container>
      <Box sx={{ mt: 8 }}>
        <Typography component="h1" variant="h5">Workflows</Typography>
        <Button component={Link} to="/create-workflow" variant="contained" color="primary" sx={{ mb: 2 }}>
          Create New Workflow
        </Button>
        <List>
          {workflows.map((workflow) => (
            <ListItem button component={Link} to={`/workflows/${workflow._id}`} key={workflow._id}>
              <ListItemText primary={workflow.name} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
}

export default WorkflowList;
