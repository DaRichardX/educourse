"use client";

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
import { Prohibit as Prohibit } from "@phosphor-icons/react/dist/ssr/Prohibit";
import { DownloadSimple as DownloadIcon } from "@phosphor-icons/react/dist/ssr/DownloadSimple";
import { Users as UsersIcon } from "@phosphor-icons/react/dist/ssr/Users";
import { Warning as WarningIcon } from "@phosphor-icons/react/dist/ssr/Warning";
import { ListChecks as ListChecksIcon } from '@phosphor-icons/react/dist/ssr/ListChecks';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
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
import { SignupsSummary } from '@/components/dashboard/overview/summary/signups-summary';

import { Modal8 } from "@/components/widgets/modals/modal-8";
import { SummaryPending } from "@/components/dashboard/overview/summary-pending";

// export const metadata = { title: `Overview | Dashboard | ${config.site.name}` };

export default function Page() {
  const [openModal, setOpenModal] = useState(false);
  const [deactivateBtn, setDeactivateBtn] = useState(false);

  function toggleModal() {
    setOpenModal(!openModal);
  }

  function deactivateRegistrationBtn() {
    setDeactivateBtn(true);
  }

  return (
    <Box
      sx={{
        maxWidth: "var(--Content-maxWidth)",
        m: "var(--Content-margin)",
        p: "var(--Content-padding)",
        width: "var(--Content-width)",
      }}
    >
      {openModal && (
        <Modal8
          setModal={setOpenModal}
          deactivateRegistrationBtn={deactivateRegistrationBtn}
          onClick={toggleModal}
        />
      )}
      {openModal && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(10px)",
            zIndex: 9000,
          }}
          onClick={toggleModal}
        />
      )}
      <Stack spacing={4}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={3}
          sx={{ alignItems: "flex-start" }}
        >
          <Box sx={{ flex: "1 1 auto" }}>
            <Typography variant="h4">Overview</Typography>
          </Box>
          <div>
            <Stack spacing={1} direction="row">
              <Button
                endIcon={<Prohibit />}
                variant="contained"
                color="error"
                onClick={toggleModal}
                disabled={deactivateBtn}
              >
                Close Registration
              </Button>

              <Button
                endIcon={<DownloadIcon />}
                variant="contained"
                disabled={!deactivateBtn}
              >
                Export All
              </Button>
            </Stack>
          </div>
        </Stack>
        <Grid container spacing={4}>
          <Grid md={6} xs={12}>
            <Summary
              amount={240}
              percent={70.1}
              icon={UsersIcon}
              title="Sign ups"
            />
          </Grid>

          <Grid md={6} xs={12}>
            <SummaryPending
              amount={21}
              icon={WarningIcon}
              title="Missing Sign-ups"
            />
          </Grid>

          <Grid md={8} xs={12}>
            <Events
              events={[
                {
                  id: "EV-004",
                  title: "Capstone registration deadline",
                  description: "17:00 to 18:00",
                  createdAt: dayjs("2025-04-20").toDate(),
                },
                {
                  id: "EV-003",
                  title: "Capstone presentations",
                  description: "15:30 to 16:45",
                  createdAt: dayjs("2025-04-26").toDate(),
                },
              ]}
            />
          </Grid>

          <Grid md={4} xs={12}>
            <HelperWidget
              action={
                <Button
                  color="secondary"
                  endIcon={<ArrowRightIcon />}
                  size="small"
                  href="mailto:richardtryhard070711@gmail.com?"
                >
                  Help center
                </Button>
              }
              description="Find answers to your questions and get in touch with our team."
              icon={InfoIcon}
              label="Help center"
              title="Need help figuring things out?"
            />
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}
