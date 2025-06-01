import * as React from 'react';

// MUI Components
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Chip,
  Stack,
  Typography
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

// MUI Icons
import {
  ArrowLeft as ArrowLeftIcon,
  CaretDown as CaretDownIcon,
  CheckCircle as CheckCircleIcon,
  CreditCard as CreditCardIcon,
  House as HouseIcon,
  PencilSimple as PencilSimpleIcon,
  Plus as PlusIcon,
  ShieldWarning as ShieldWarningIcon,
  User as UserIcon,
  Calendar as CalendarIcon
} from '@phosphor-icons/react/dist/ssr';

// Project Imports
import { config } from '@/config';
import { DashboardActions } from './dashboard-actions';

export const metadata = { title: `Details | Customers | Dashboard | ${config.site.name}` };

const displayname = 'Richard Xie';
const firstname = 'Richard';
const displayemail = '2114489@learn.vsb.bc.ca';
const status1display = 'Grade 12';

export default function StudentDashboard() {
  return (
    <Box
      sx={{
        maxWidth: 'var(--Content-maxWidth)',
        m: 'var(--Content-margin)',
        p: 'var(--Content-padding)',
        width: 'var(--Content-width)',
      }}
    >
      <Stack spacing={4}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flex: '1 1 auto' }}>
              <div>
                <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
                  <Typography variant="h4">
                    {`Welcome, ${firstname}`}
                  </Typography>
                  <Chip
                    label={status1display}
                    size="small"
                    variant="outlined"
                  />
                </Stack>
                <Typography color="text.secondary" variant="body1">
                  {displayemail}
                </Typography>
              </div>
            </Stack>
            <div>
              { /* Placeholder for future content, this was the action button to the right */ }
            </div>
          </Stack>
        </Stack>
        <Grid container spacing={4}>
          <Grid lg={4} xs={12}>
            <Stack spacing={4}>
              <Card>
                <CardHeader
                    avatar={
                    <Avatar>
                        <CalendarIcon size={20} />
                    </Avatar>
                    }
                    title="Upcoming Deadlines"
                />


                {  /* Placeholder for future content, content for the upcoming deadlines*/}



              </Card>
            </Stack>
          </Grid>
          <Grid lg={8} xs={12}>
            <Stack spacing={4}>
              <DashboardActions />
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}
