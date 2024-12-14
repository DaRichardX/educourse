'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CheckCircle as CheckCircleIcon } from '@phosphor-icons/react/dist/ssr/CheckCircle';
import { Clock as ClockIcon } from '@phosphor-icons/react/dist/ssr/Clock';
import { DotsThree as Dots } from '@phosphor-icons/react/dist/ssr/DotsThree';
import { Image as ImageIcon } from '@phosphor-icons/react/dist/ssr/Image';

import { paths } from '@/paths';
import { DataTable } from '@/components/core/data-table';

const columns = [
  {
    formatter: (row) => (
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
        <div>
          <Link
            color="text.primary"
            component={RouterLink}
            href={paths.dashboard.products.preview('1')}
            sx={{ whiteSpace: 'nowrap' }}
            variant="subtitle2"
          >
            {row.name}
          </Link>
          <Typography color="text.secondary" variant="body2">
          </Typography>
        </div>
      </Stack>
    ),
    name: 'Name',
    width: '300px',
  },
  { field: 'id', name: 'Room Number', width: '150px' },
  { field: 'room_capacity', name: 'Room Capacity', width: '100px' },

  {
    formatter: () => (
      <IconButton component={RouterLink} href=''>
        <Dots />
      </IconButton>
    ),
    name: 'Actions',
    hideName: true,
    width: '100px',
    align: 'right',
  },
];

export function RoomsTable({ rows = [] }) {
  return (
    <React.Fragment>
      <DataTable columns={columns} rows={rows} />
      {!rows.length ? (
        <Box sx={{ p: 3 }}>
          <Typography color="text.secondary" sx={{ textAlign: 'center' }} variant="body2">
            No products found
          </Typography>
        </Box>
      ) : null}
    </React.Fragment>
  );
}
