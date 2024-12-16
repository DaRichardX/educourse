'use client';
import React, { useState } from 'react';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { RoomsTable } from "@/components/dashboard/capstone/rooms/room-table";
import { RoomCreateModal } from "@/components/dashboard/capstone/rooms/room-create-modal";

const roomsData = [
  { id: '1B2', name: 'Zaremba Paul', current_register: 5, room_capacity: 30 },
  { id: '1B3', name: 'Samasan Sas', current_register: 20, room_capacity: 30 },
  { id: '1B4', name: 'Carbon Fiber', current_register: 21, room_capacity: 30 },
  { id: '1B5', name: 'Asaspin Las', current_register: 30, room_capacity: 30 },
];

export default function Page() {
  // States
  const [rooms, setRooms] = useState(roomsData); // Room data
  const [searchTerm, setSearchTerm] = useState(''); // Search term
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility

  // Handlers
  const handleSearchChange = (event) => setSearchTerm(event.target.value);
  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const handleAddRoom = (newRoom) => {
    setRooms((prevRooms) => [...prevRooms, newRoom]);
    handleModalClose(); // Close the modal after adding
  };
  const handleDelete = (roomToDelete) => {
    setRooms((prevRooms) => prevRooms.filter((room) => room.id !== roomToDelete.id));
  };

  // Filter rooms
  const filteredRooms = applyFilters(rooms, { searchTerm });

  return (
    <React.Fragment>
      <Box
        sx={{
          maxWidth: 'var(--Content-maxWidth)',
          m: 'var(--Content-margin)',
          p: 'var(--Content-padding)',
          width: 'var(--Content-width)',
        }}
      >
        <Stack spacing={4}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={3}
            sx={{ alignItems: 'flex-start' }}
          >
            <Box sx={{ flex: '1 1 auto' }}>
              <Typography variant="h4">Rooms</Typography>
            </Box>
            <div>
              <Button
                startIcon={<PlusIcon />}
                variant="contained"
                onClick={handleModalOpen}
              >
                Add
              </Button>
            </div>
          </Stack>
          <Box sx={{ mb: 2 }}>
            <input
              type="text"
              placeholder="Search by teacher name or room number"
              value={searchTerm}
              onChange={handleSearchChange}
              style={{
                padding: '8px 20px',
                fontSize: '16px',
                height: '2.8rem',
                background: '#f5f5f5',
                outline: 'none',
                border: 'none',
                borderRadius: '1.625rem',
                width: '100%',
                maxWidth: '800px',
              }}
            />
          </Box>
          <Card>
            <Divider />
            <Box sx={{ overflowX: 'auto' }}>
              <RoomsTable rows={filteredRooms} onDelete={handleDelete} />
            </Box>
            <Divider />
          </Card>
        </Stack>
      </Box>

      <RoomCreateModal
        open={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleAddRoom}
      />
    </React.Fragment>
  );
}

// Filtering logic based only on search term
function applyFilters(row, { searchTerm }) {
  return row.filter((item) => {
    if (
      searchTerm &&
      !(
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase())
      )
    ) {
      return false;
    }
    return true;
  });
}
