'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';

export function StudentCreateModal({ open, onClose, onSubmit }) {
  // State for student inputs
  const [studentData, setStudentData] = React.useState({
    id: '',
    name: '',
    type:'',
    status: 'pending'
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(studentData);
    onClose();
  };

  return (
    <Dialog
      maxWidth="sm"
      onClose={onClose}
      open={open}
      sx={{
        '& .MuiDialog-container': { justifyContent: 'center' },
        '& .MuiDialog-paper': { width: '100%', maxWidth: 500 },
        // backdropFilter: 'blur(5px)'
      }}
    >
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6">Add New Room</Typography>
          <IconButton onClick={onClose}>
            <XIcon />
          </IconButton>
        </Stack>
        <form onSubmit={handleFormSubmit}>
          <Stack spacing={3}>
            <TextField
              label="Student Number"
              name="id"
              value={studentData.id}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <TextField
              label="Name"
              name="name"
              value={studentData.name}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <TextField // TODO change to select type
              label="Type"
              name="type"
              value={studentData.type}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button onClick={onClose} color="secondary">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Add Student
              </Button>
            </Stack>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
}
