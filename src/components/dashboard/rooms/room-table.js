import * as React from 'react';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import { CheckCircle as CheckCircleIcon } from '@phosphor-icons/react/dist/ssr/CheckCircle';
import { Clock as ClockIcon } from '@phosphor-icons/react/dist/ssr/Clock';
import { DotsThree as Dots } from '@phosphor-icons/react/dist/ssr/DotsThree';
import { Image as ImageIcon } from '@phosphor-icons/react/dist/ssr/Image';

import { paths } from '@/paths';
import { DataTable } from '@/components/core/data-table';
import LinearProgress from "@mui/material/LinearProgress";

export function RoomsTable({ rows = [] }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [currentRow, setCurrentRow] = React.useState(null);

  const handleOpen = (event, row) => {
    setAnchorEl(event.currentTarget);
    setCurrentRow(row);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setCurrentRow(null);
  };

  const open = Boolean(anchorEl);

  const columns = [
    {
      field: 'id',
      name: 'Room',
      width: '150px',
    },
    {
      formatter: (row) => (
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <div>
            <Typography color="text.primary" variant="body2">{row.name}</Typography>
            <Typography color="text.secondary" variant="body2"></Typography>
          </div>
        </Stack>
      ),
      name: 'Teacher',
      width: '150px',
    },
    {
      formatter: (row) => (
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <LinearProgress sx={{ flex: '1 1 auto', maxWidth: '300px' }} value={(row.current_register / row.room_capacity) * 100} variant="determinate" />
          <Typography color="text.secondary" variant="body2">
            {row.current_register}/{row.room_capacity}
          </Typography>
        </Stack>
      ),
      name: 'Progress',
      width: '100px',
    },
    {
      formatter: (row) => (
        <div>
          <IconButton variant="contained" onClick={(event) => handleOpen(event, row)}>
            <Dots />
          </IconButton>
        </div>
      ),
      name: 'Actions',
      hideName: true,
      width: '100px',
      align: 'right',
    },
  ];

  return (
    <React.Fragment>
      <DataTable columns={columns} rows={rows} />
      {!rows.length ? (
        <Box sx={{ p: 3 }}>
          <Typography color="text.secondary" sx={{ textAlign: 'center' }} variant="body2">
            No rooms found
          </Typography>
        </Box>
      ) : null}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box sx={{ p: 1 }}>
          <Button onClick={handleClose} size="small" sx={{ color:'red' }}>Delete</Button>
        </Box>
      </Popover>
    </React.Fragment>
  );
}
