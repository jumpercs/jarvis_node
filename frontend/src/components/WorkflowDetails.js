import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Button, List, ListItem, ListItemText } from '@mui/material';

function WorkflowDetails() {
  const { id } = useParams();
  const [workflow, setWorkflow] = useState(null);

  useEffect(() => {
    const fetchWorkflow = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:3001/api/workflows/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWorkflow(response.data);
    };

    fetchWorkflow();
  }, [id]);

  const handleExecuteWorkflow = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(`http://localhost:3001/api/workflows/${id}/execute`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Workflow executed successfully');
    } catch (error) {
      console.error('Failed to execute workflow', error);
    }
  };

  return (
    <Container>
      {workflow ? (
        <Box sx={{ mt: 8 }}>
          <Typography component="h1" variant="h5">{workflow.name}</Typography>
          <List>
            {workflow.steps.map((step, index) => (
              <ListItem key={index}>
                <ListItemText primary={`Step ${index + 1}: ${step.type} - ${step.action}`} />
              </ListItem>
            ))}
          </List>
          <Button variant="contained" color="primary" onClick={handleExecuteWorkflow} sx={{ mt: 2 }}>
            Execute Workflow
          </Button>
        </Box>
      ) : (
        <Typography component="h1" variant="h5">Loading...</Typography>
      )}
    </Container>
  );
}

export default WorkflowDetails;
