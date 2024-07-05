import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, MenuItem } from '@mui/material';
import componentMapping from './componentMapping';

function AddRecord() {
  const { id } = useParams();
  const [entity, setEntity] = useState(null);
  const [record, setRecord] = useState({});

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

  const handleChange = (e, component) => {
    setRecord({
      ...record,
      [component.label]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post(`http://localhost:3001/api/entities/${id}/records`, record, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Record added successfully');
    } catch (error) {
      console.error('Failed to add record', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">Add Record</Typography>
        {entity ? (
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            {entity.components.map((component, index) => {
              const Component = componentMapping[component.type];
              return (
                <div key={index}>
                  {Component && (
                    <Component
                      margin="normal"
                      fullWidth
                      label={component.label}
                      onChange={(e) => handleChange(e, component)}
                   
                    />
                  )}
                </div>
              );
            })}
            <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
              Add Record
            </Button>
          </Box>
        ) : (
          <Typography component="h1" variant="h5">Loading...</Typography>
        )}
      </Box>
    </Container>
   );
}

export default AddRecord;
