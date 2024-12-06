'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CheckCircle as CheckCircleIcon } from '@phosphor-icons/react/dist/ssr/CheckCircle';
import { Clock as ClockIcon } from '@phosphor-icons/react/dist/ssr/Clock';
import { Minus as MinusIcon } from '@phosphor-icons/react/dist/ssr/Minus';

import { paths } from '@/paths';
import { DataTable } from '@/components/core/data-table';

const columns = [
  {
    formatter: (row) => (
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <div>
          <Typography
            color="inherit"
            sx={{ whiteSpace: 'nowrap' }}
            variant="subtitle2"
          >
            {row.name}
          </Typography>
        </div>
      </Stack>
    ),
    name: 'Grade',
    width: '100px',
  },
  {
    formatter: (row) => (
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
        <LinearProgress sx={{ flex: '1 1 auto', maxWidth: '400px' }} value={row.percentage} variant="determinate" />
        <Typography color="text.secondary" variant="body2">
          {row.percentage}%
        </Typography>
      </Stack>
    ),
    name: 'Progress',
    width: '300px',
  },
  {
    formatter: (row) => {
      const mapping = {
        complete: { label: 'Complete', icon: <CheckCircleIcon color="var(--mui-palette-success-main)" weight="fill" /> },
        blocked: { label: 'Blocked', icon: <MinusIcon color="var(--mui-palette-error-main)" /> },
        pending: { label: 'Pending', icon: <ClockIcon color="var(--mui-palette-warning-main)" weight="fill" /> },
      };
      const { label, icon } = mapping[row.status] ?? { label: 'Unknown', icon: null };
      return <Chip icon={icon} label={label} size="small" variant="outlined" />;
    },
    name: 'Status',
    width: '150px',
  },
];

export function CustomersTable({ rows }) {
  return (
    <React.Fragment>
      <DataTable
        columns={columns}
        rows={rows}
      />
      {!rows.length ? (
        <Box sx={{ p: 3 }}>
          <Typography color="text.secondary" sx={{ textAlign: 'center' }} variant="body2">
            No students found
          </Typography>
        </Box>
      ) : null}
    </React.Fragment>
  );
}
