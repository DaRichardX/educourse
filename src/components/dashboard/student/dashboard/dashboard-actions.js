'use client';

import * as React from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import IconButton from '@mui/material/IconButton';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { NotePencil as NotePencilIcon } from '@phosphor-icons/react/dist/ssr/NotePencil';

import { DataTable } from '@/components/core/data-table';

const columns = [
  {
    name: 'Action',
    formatter: (row) => (
      <Stack direction="row" spacing={1} alignItems="center">
        {row.icon}
        <Typography variant="subtitle2">{row.label}</Typography>
      </Stack>
    ),
    width: '60%',
  },
  {
    name: 'Status',
    formatter: (row) => (
      (row.status === 'Available' ? (
        <Chip color="success" label={row.status} size="small" variant="soft" />
      ) : (
        <Chip
        label={row.status}
        size="small"
        variant="soft"
        sx={{
        backgroundColor: row.status === 'Available' ? 'success.light' : 'grey.100',
        color: row.status === 'Available' ? 'success.dark' : 'text.disabled',
        borderColor: row.status === 'Available' ? 'success.main' : 'grey.300',
        }}
      />
      ))
    ),
    width: '150px',
  },
  {
    name: '',
    formatter: (row) => (
      <IconButton href={row.href}>
        <ArrowRightIcon />
      </IconButton>
    ),
    align: 'right',
  },
];

const actions = [
  {
    label: 'Request a course change',
    icon: <NotePencilIcon size={18} />,
    status: 'Available',
    href: '/support/course-change',
  },
  {
    label: 'Request deadline extension',
    icon: <NotePencilIcon size={18} />,
    status: 'Available',
    href: '/support/deadline-extension',
  },
  {
    label: 'Signup to view the capstone presentations',
    icon: <NotePencilIcon size={18} />,
    status: 'Not Yet Open',
    href: '/support/report-issue',
  },
  {
    label: 'Register my courses',
    icon: <NotePencilIcon size={18} />,
    status: 'Pass Deadline',
    href: '/support/feedback',
  },
  {
    label: 'Contact support',
    icon: <NotePencilIcon size={18} />,
    status: 'Available',
    href: '/support/contact',
  },
];

export function DashboardActions() {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar>
            <NotePencilIcon fontSize="var(--Icon-fontSize)" />
          </Avatar>
        }
        title="Available Actions"
        action={
          <Button color="secondary" startIcon={<PlusIcon />}>
            New Request
          </Button>
        }
      />
      <CardContent>
        <Stack spacing={2}>

          <Card sx={{ borderRadius: 1 }} variant="outlined">
            <Box sx={{ overflowX: 'auto' }}>
              <DataTable columns={columns} rows={actions} />
            </Box>
          </Card>
        </Stack>
      </CardContent>
    </Card>
  );
}
