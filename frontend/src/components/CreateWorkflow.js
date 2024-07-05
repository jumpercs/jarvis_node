import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, MenuItem } from '@mui/material';

const actionTypes = [
  { value: 'entity', label: 'Entity' },
  { value: 'notification', label: 'Notification' },
  { value: 'external', label: 'External' },
];

const entityActions = [
  { value: 'create', label: 'Create' },
  { value: 'update', label: 'Update' },
  { value: 'delete', label: 'Delete' },
];

function CreateWorkflow() {
  const [name, setName] = useState('');
  const [steps, setSteps] = useState([]);
  const [newStep, setNewStep] = useState({ type: '', action: '', params: {} });
  const navigate = useNavigate();

  const addStep = () => {
    setSteps([...steps, newStep]);
    setNewStep({ type: '', action: '', params: {} });
  };

  const handleCreateWorkflow = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        'http://localhost:3001/api/workflows',
        { name, steps },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Workflow created successfully');
      navigate('/workflows');
    } catch (error) {
      console.error('Failed to create workflow', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">Create Workflow</Typography>
        <Box component="form" onSubmit={handleCreateWorkflow} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Workflow Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Typography component="h2" variant="h6">Add Step</Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            select
            label="Type"
            value={newStep.type}
            onChange={(e) => setNewStep({ ...newStep, type: e.target.value })}
          >
            {actionTypes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          {newStep.type === 'entity' && (
            <>
              <TextField
                margin="normal"
                required
                fullWidth
                select
                label="Action"
                value={newStep.action}
                onChange={(e) => setNewStep({ ...newStep, action: e.target.value })}
              >
                {entityActions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Entity ID"
                value={newStep.params.entityId || ''}
                onChange={(e) => setNewStep({ ...newStep, params: { ...newStep.params, entityId: e.target.value } })}
              />
              {newStep.action !== 'create' && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Record ID"
                  value={newStep.params.recordId || ''}
                  onChange={(e) => setNewStep({ ...newStep, params: { ...newStep.params, recordId: e.target.value } })}
                />
              )}
              <TextField
                margin="normal"
                fullWidth
                label="Record Data (JSON)"
                value={JSON.stringify(newStep.params.record || {})}
                onChange={(e) => setNewStep({ ...newStep, params: { ...newStep.params, record: JSON.parse(e.target.value) } })}
              />
            </>
          )}
          {newStep.type === 'notification' && (
            <>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email"
                value={newStep.params.email || ''}
                onChange={(e) => setNewStep({ ...newStep, params: { ...newStep.params, email: e.target.value } })}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Message"
                value={newStep.params.message || ''}
                onChange={(e) => setNewStep({ ...newStep, params: { ...newStep.params, message: e.target.value } })}
              />
            </>
          )}
          {newStep.type === 'external' && (
            <TextField
              margin="normal"
              fullWidth
              label="External Params (JSON)"
              value={JSON.stringify(newStep.params || {})}
              onChange={(e) => setNewStep({ ...newStep, params: JSON.parse(e.target.value) })}
            />
          )}
          <Button variant="contained" color="secondary" onClick={addStep} sx={{ mt: 2 }}>
            Add Step
          </Button>
          <Typography component="h2" variant="h6" sx={{ mt: 4 }}>Steps</Typography>
          <ul>
            {steps.map((step, index) => (
              <li key={index}>{step.type} - {step.action}</li>
            ))}
          </ul>
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
            Create Workflow
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default CreateWorkflow;
