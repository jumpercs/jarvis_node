import React from 'react';
import { TextField, MenuItem } from '@mui/material';

const componentMapping = {
  text: (props) => <TextField {...props} />,
  password: (props) => <TextField type="password" {...props} />,
  select: (props) => (
    <TextField select {...props}>
      {props.options.map((option, index) => (
        <MenuItem key={index} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  ),
  number: (props) => <TextField type="number" {...props} />,
  date: (props) => <TextField type="date" {...props} />,
};

export default componentMapping;
