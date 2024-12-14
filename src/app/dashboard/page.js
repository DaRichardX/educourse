"use client";

import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { ArrowRight as ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { Prohibit as Prohibit } from "@phosphor-icons/react/dist/ssr/Prohibit";
import { FileCode as FileCodeIcon } from "@phosphor-icons/react/dist/ssr/FileCode";
import { Info as InfoIcon } from "@phosphor-icons/react/dist/ssr/Info";
import { DownloadSimple as DownloadIcon } from "@phosphor-icons/react/dist/ssr/DownloadSimple";
import { ListChecks as ListChecksIcon } from "@phosphor-icons/react/dist/ssr/ListChecks";
import { Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import { Users as UsersIcon } from "@phosphor-icons/react/dist/ssr/Users";
import { Warning as WarningIcon } from "@phosphor-icons/react/dist/ssr/Warning";

import { config } from "@/config";
import { dayjs } from "@/lib/dayjs";
import { AppChat } from "@/components/dashboard/overview/app-chat";
import { AppLimits } from "@/components/dashboard/overview/app-limits";
import { AppUsage } from "@/components/dashboard/overview/app-usage";
import { Events } from "@/components/dashboard/overview/events";
import { HelperWidget } from "@/components/dashboard/overview/helper-widget";
import { Modal8 } from "@/components/widgets/modals/modal-8";
import { Subscriptions } from "@/components/dashboard/overview/subscriptions";
import { Summary } from "@/components/dashboard/overview/summary";
import { SummaryPending } from "@/components/dashboard/overview/summary-pending";
import { de } from "@/locales/de";
// import { position } from "stylis";
// import zIndex from "@mui/material/styles/zIndex";

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
          {/*<Grid md={4} xs={12}>*/}
          {/*  <Summary amount={31} diff={15} icon={ListChecksIcon} title="Tickets" trend="up" />*/}
          {/*</Grid>*/}
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

          <Grid md={4} xs={12}>
            <HelperWidget
              action={
                <Button
                  color="secondary"
                  endIcon={<ArrowRightIcon />}
                  size="small"
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
          <Grid md={4} xs={12}>
            <HelperWidget
              action={
                <Button
                  color="secondary"
                  endIcon={<ArrowRightIcon />}
                  size="small"
                >
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
