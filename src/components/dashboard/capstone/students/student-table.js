import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import { DotsThree as Dots } from '@phosphor-icons/react/dist/ssr/DotsThree';

import { DataTable } from '@/components/core/data-table';
import {CheckCircle as CheckCircleIcon} from "@phosphor-icons/react/dist/ssr/CheckCircle";
import {Minus as MinusIcon} from "@phosphor-icons/react/dist/ssr/Minus";
import {Clock as ClockIcon} from "@phosphor-icons/react/dist/ssr/Clock";
import Chip from "@mui/material/Chip";

export function StudentTable({ rows = [], onDelete }) {
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

  const handleDelete = () => {
    if (currentRow && onDelete) {
      onDelete(currentRow); // Call the onDelete callback with the current row
    }
    handleClose();
  };

  const open = Boolean(anchorEl);

  const columns = [
    {
      field: 'id',
      name: 'Student Number',
      width: '170px',
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
      name: 'Name',
      width: '150px',
    },
    {
      formatter: (row) => {
        const mapping = {
          submitted: { label: 'Submitted', icon: <CheckCircleIcon color="var(--mui-palette-success-main)" weight="fill" /> },
          pending: { label: 'Pending', icon: <ClockIcon color="var(--mui-palette-warning-main)" weight="fill" /> },
        };
        const { label, icon } = mapping[row.status] ?? { label: 'Unknown', icon: null };

        return <Chip icon={icon} label={label} size="small" variant="outlined" />;
      },
      name: 'Status',
      width: '150px',
    },
    {
      field: 'type',
      name: 'Type',
      width: '150px',
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
            No students found
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
          <Button onClick={handleDelete} size="small" sx={{ color:'red' }}>Delete</Button>
        </Box>
      </Popover>
    </React.Fragment>
  );
}
