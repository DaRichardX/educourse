import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { FileCode as FileCodeIcon } from '@phosphor-icons/react/dist/ssr/FileCode';
import { Info as InfoIcon } from '@phosphor-icons/react/dist/ssr/Info';
import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';
import { Warning as WarningIcon } from '@phosphor-icons/react/dist/ssr/Warning';

import { CustomersTable as GradesTable } from '@/components/dashboard/customer/customers-table.js';
import { config } from '@/config';
import { dayjs } from '@/lib/dayjs';
import { Events } from '@/components/dashboard/overview/events';
import { HelperWidget } from '@/components/dashboard/overview/helper-widget';
import { Summary } from '@/components/dashboard/overview/summary';
import { SummaryPending } from '@/components/dashboard/overview/summary-pending';

export const metadata = { title: `Overview | Dashboard | ${config.site.name}` };
const rows = [
  {
    id: 1,
    name: 'Grade 12',
    percentage: 100,
    status: 'complete',
  },
  {
    id: 2,
    name: 'Grade 11',
    percentage: 100,
    status: 'complete',
  },
  {
    id: 3,
    name: 'Grade 10',
    percentage: 90,
    status: 'pending',
  },
  {
    id: 4,
    name: 'Grade 9',
    percentage: 68,
    status: 'pending',
  },
  {
    id: 5,
    name: 'Grade 8',
    percentage: 89,
    status: 'pending',
  },
];

export default function Page() {
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
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
          <Box sx={{ flex: '1 1 auto' }}>
            <Typography variant="h3">Overview</Typography>
          </Box>
          <div>
          <Button endIcon={<DownloadIcon />} variant="contained">
            Export All
          </Button>
          </div>
        </Stack>
        <Grid container spacing={4}>
          
          <Grid md={6} xs={12}>
            <Summary amount={845} icon={UsersIcon} title="Sign ups" />
          </Grid>

          <Grid md={6} xs={12}>
            <SummaryPending amount={340} icon={WarningIcon} title="Pending Submissions" />
          </Grid>

          <Grid md={12} xs={12}>
            <GradesTable rows={rows} />
          </Grid>
          
          <Grid md={4} xs={12}>
            <Events
              events={[
                {
                  id: 'EV-004',
                  title: 'Meeting with partners',
                  description: '17:00 to 18:00',
                  createdAt: dayjs().add(1, 'day').toDate(),
                },
                {
                  id: 'EV-003',
                  title: 'Interview with Jonas',
                  description: '15:30 to 16:45',
                  createdAt: dayjs().add(4, 'day').toDate(),
                },
                {
                  id: 'EV-002',
                  title: "Doctor's appointment",
                  description: '12:30 to 15:30',
                  createdAt: dayjs().add(4, 'day').toDate(),
                },
                {
                  id: 'EV-001',
                  title: 'Weekly meeting',
                  description: '09:00 to 09:30',
                  createdAt: dayjs().add(7, 'day').toDate(),
                },
              ]}
            />
          </Grid>
          <Grid md={4} xs={12}>
            <HelperWidget
              action={
                <Button color="secondary" endIcon={<ArrowRightIcon />} size="small">
                  Help center
                </Button>
              }
              description="Find answers to your questions and get in touch with our team."
              icon={InfoIcon}
              label="Help center"
              title="Need help figuring things out?"
            />
          </Grid>
          <Grid md={4} xs={12}>
            <HelperWidget
              action={
                <Button color="secondary" endIcon={<ArrowRightIcon />} size="small">
                  Documentation
                </Button>
              }
              description="Learn how to get started with our product and make the most of it."
              icon={FileCodeIcon}
              label="Documentation"
              title="Explore documentation"
            />
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}

function DownloadIcon() { return (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="#FFFFFF"
  >
    <path d="M12 16l4-4h-3V4h-2v8H8l4 4zm-6 2v2h12v-2H6z" />
  </svg>
)};
