import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { Briefcase as BriefcaseIcon } from '@phosphor-icons/react/dist/ssr/Briefcase';
import { FileCode as FileCodeIcon } from '@phosphor-icons/react/dist/ssr/FileCode';
import { Info as InfoIcon } from '@phosphor-icons/react/dist/ssr/Info';
import { DownloadSimple as DownloadIcon} from '@phosphor-icons/react/dist/ssr/DownloadSimple';
import { ListChecks as ListChecksIcon } from '@phosphor-icons/react/dist/ssr/ListChecks';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';
import { Warning as WarningIcon } from '@phosphor-icons/react/dist/ssr/Warning';

import { config } from '@/config';
import { dayjs } from '@/lib/dayjs';
import { AppChat } from '@/components/dashboard/overview/app-chat';
import { AppLimits } from '@/components/dashboard/overview/app-limits';
import { AppUsage } from '@/components/dashboard/overview/app-usage';
import { Events } from '@/components/dashboard/overview/events';
import { HelperWidget } from '@/components/dashboard/overview/helper-widget';
import { Subscriptions } from '@/components/dashboard/overview/subscriptions';
import { Summary } from '@/components/dashboard/overview/summary';
import { SummaryPending } from '@/components/dashboard/overview/summary-pending';


export const metadata = { title: `Overview | Dashboard | ${config.site.name}` };

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
            <Typography variant="h4">Overview</Typography>

          </Box>
          <div>
            {/*<Button startIcon={<PlusIcon />} variant="contained">*/}
            {/*  Dashboard*/}
            {/*</Button>*/}
            <Button endIcon={<DownloadIcon />} variant="contained">
              Export All
            </Button>
          </div>
        </Stack>
        <Grid container spacing={4}>
          {/*<Grid md={4} xs={12}>*/}
          {/*  <Summary amount={31} diff={15} icon={ListChecksIcon} title="Tickets" trend="up" />*/}
          {/*</Grid>*/}
          <Grid md={6} xs={12}>
            <Summary amount={240} percent={70.1} icon={UsersIcon} title="Sign ups" />
          </Grid>
          <Grid md={6} xs={12}>
            <SummaryPending amount={21} icon={WarningIcon} title="Missing Sign-ups" />
          </Grid>
          {/*<Grid md={12} xs={12}>*/}
          {/*  <GradesTable rows={rows} />*/}
          {/*</Grid>*/}
          {/*<Grid md={4} xs={12}>*/}
          {/*  <AppLimits usage={80} />*/}
          {/*</Grid>*/}
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
