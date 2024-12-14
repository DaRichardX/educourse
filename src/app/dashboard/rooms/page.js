'use client';
import React, { useState } from 'react'; // Import useState
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { config } from '@/config';
import { paths } from '@/paths';
import {RoomsTable} from "@/components/dashboard/rooms/room-table";
import {RoomCreateModal} from "@/components/dashboard/rooms/room-create-modal";

// export const metadata = { title: `List | Products | Dashboard | ${config.site.name}` };

const rooms = [
  {
    id: '1B2',
    name: 'Zaremba Paul',
    room_capacity: 30,
  }, {
    id: '1B3',
    name: 'S',
    room_capacity: 30,
  }, {
    id: '1B4',
    name: 'C',
    room_capacity: 30,
  }, {
    id: '1B5',
    name: 'A',
    room_capacity: 30,
  },
];

export default function Page() {
  // State for search term
  const [searchTerm, setSearchTerm] = useState('');

  // Handle the search bar input
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Apply filtering based on the search term
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
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
            <Box sx={{ flex: '1 1 auto' }}>
              <Typography variant="h4">Rooms</Typography>
            </Box>
            <div>
              <Button
                component={RouterLink}
                href={paths.dashboard.rooms}
                startIcon={<PlusIcon />}
                variant="contained"
              >
                Add
              </Button>
              <Button
                component={RouterLink}
                href=''
                startIcon={<PlusIcon />}
                variant="contained"
              >
                Import
              </Button>
            </div>
          </Stack>
          <Box sx={{ mb: 2 }}>
            <input
              type="text"
              placeholder="Search by teacher name or room number"
              value={searchTerm}
              onChange={handleSearchChange}
              style={{ width: '100%', padding: '8px', fontSize: '16px' }}
            />
          </Box>
          <Card>
            <Divider />
            <Box sx={{ overflowX: 'auto' }}>
              <RoomsTable rows={filteredRooms} />
            </Box>
            <Divider />
          </Card>
        </Stack>
      </Box>
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
