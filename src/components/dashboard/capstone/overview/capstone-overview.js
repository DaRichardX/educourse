'use client';

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { ArrowRight as ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { Info as InfoIcon } from "@phosphor-icons/react/dist/ssr/Info";
import { Prohibit } from "@phosphor-icons/react/dist/ssr/Prohibit";
import { DownloadSimple as DownloadIcon } from "@phosphor-icons/react/dist/ssr/DownloadSimple";
import { Warning as WarningIcon } from "@phosphor-icons/react/dist/ssr/Warning";
import { Bug as DebugIcon } from "@phosphor-icons/react/dist/ssr/Bug";


import { dayjs } from "@/lib/dayjs";
import { Events } from "@/components/dashboard/overview/events";
import { HelperWidget } from "@/components/dashboard/overview/helper-widget";

import { SummaryPending } from "@/components/dashboard/overview/summary-pending";
import { ConfirmationPrompt, PromptTypes } from "./confirmation-prompt";
import { SignupsSummary } from "../summary/signups-summary";
import { LoadingButton } from "@mui/lab";
import { useUser } from '@/hooks/use-user';
import { useAddSignup} from "@/queries/capstone-queries";

export function CapstoneOverview(){
  const [displayDeactivateConfirm, setDisplayDeactivateConfirm] = React.useState(false);
  const [isRegClosed, setIsRegClosed] = React.useState(false);
  const [isLoadingClosingReg, setLoadingClosingReg] = React.useState(false);
  const { mutate: addSignup, error, isLoading} = useAddSignup();
  const user = useUser().user;
  if(!user){
    return <></>;
  }
  const debug = (user.role === "admin");

  function toggleConfirmDeactivationDisplay() {
    setDisplayDeactivateConfirm(!displayDeactivateConfirm);
  }

  function DeactivateReg(){
    setLoadingClosingReg(true);
    setIsRegClosed(true);
  }


  // used for testing only
  function debugFunc(){
    // @ts-ignore
    // IT LITERALLY IS NOT FREAKING VOID???? WHAT YOUR MOTHER IS VOID BRO WWHY DOES IT THINK ITS VOID????? refering to ts-ignore
    addSignup({
      orgId: "example",
      name: "Richard",
      room: "1D2",
    });
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
      <ConfirmationPrompt
          type={PromptTypes.deactivateSubmissions}
          isActive={displayDeactivateConfirm}
          setActive={setDisplayDeactivateConfirm}
          action={DeactivateReg}
      />

      {/* gray box when confirmation box is active*/}
      {displayDeactivateConfirm ? <Box
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
          onClick={toggleConfirmDeactivationDisplay} 
        /> : null}

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
              {isRegClosed ? 
              <LoadingButton
                endIcon={<Prohibit />}
                loadingPosition="end"
                variant="contained"
                color="error"
                disabled
                onClick={DeactivateReg}
                loading={false}
                >
                  Registration is Closed
                </LoadingButton>
              : 
                <LoadingButton
                endIcon={<Prohibit/>}
                loadingPosition="end"
                variant="contained"
                color="error"
                onClick={DeactivateReg}
                loading={isLoadingClosingReg}
                >
                  Close Registration
                </LoadingButton>
              }
              <Button
                endIcon={<DownloadIcon/>}
                variant="contained"
                disabled={!isRegClosed}
              >
                Export All
              </Button>

              {/* Debug button, not rendered in prod */}
              {debug ? <Button
                endIcon={<DebugIcon/>}
                variant="contained"
                onClick={debugFunc}
              >
                Run Func
              </Button> : null}

            </Stack>
          </div>
        </Stack>
        <Grid container spacing={4}>
          <Grid md={6} xs={12}>
            <SignupsSummary/>
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