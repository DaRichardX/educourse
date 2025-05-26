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
import { StudentTable } from "@/components/dashboard/capstone/students/student-table";
import { StudentCreateModal } from "@/components/dashboard/capstone/students/student-create-modal";

const studentData = [
  { id: '2241495', name: 'Zaremba Paul', status: 'submitted', type:'Presenter'},
  { id: '2241496', name: 'Samasan Sas', status:'pending', type:'Presenter'},
  { id: '2241497', name: 'Carbon Fiber', status: 'submitted', type:'Viewer'},
  { id: '2241498', name: 'Asaspin Las', status: 'submitted', type:'Viewer'},
];

export default function Page() {
  // States
  const [student, setStudent] = useState(studentData); // Room data
  const [searchTerm, setSearchTerm] = useState(''); // Search term
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility

  // Handlers
  const handleSearchChange = (event) => setSearchTerm(event.target.value);
  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const handleAddStudent = (newRoom) => {
    setStudent((prevRooms) => [...prevRooms, newRoom]);
    handleModalClose(); // Close the modal after adding
  };
  const handleDelete = (roomToDelete) => {
    setStudent((prevRooms) => prevRooms.filter((room) => room.id !== roomToDelete.id));
  };

  // Filter rooms
  const filteredStudents = applyFilters(student, { searchTerm });

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
              <Typography variant="h4">Students</Typography>
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
              placeholder="Search by student name, student number, type, or status"
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
              <StudentTable rows={filteredStudents} onDelete={handleDelete} />
            </Box>
            <Divider />
          </Card>
        </Stack>
      </Box>

      <StudentCreateModal
        open={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleAddStudent}
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
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.status.toLowerCase().includes(searchTerm.toLowerCase())
      )
    ) {
      return false;
    }
    return true;
  });
}
