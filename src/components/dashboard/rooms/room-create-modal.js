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

export function RoomCreateModal({ open, onClose, onSubmit }) {
  // State for room inputs
  const [roomData, setRoomData] = React.useState({
    id: '',
    room_capacity: '',
    name: '',
    current_register:0
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoomData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(roomData);
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
              label="Room Name"
              name="id"
              value={roomData.id}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <TextField
              label="Teacher"
              name="name"
              value={roomData.name}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <TextField
              label="Room Capacity"
              name="room_capacity"
              type="number"
              value={roomData.room_capacity}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button onClick={onClose} color="secondary">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Add Room
              </Button>
            </Stack>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
}
