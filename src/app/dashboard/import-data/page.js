"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { Users as UsersIcon } from "@phosphor-icons/react/dist/ssr/Users";
import { Warning as WarningIcon } from "@phosphor-icons/react/dist/ssr/Warning";
import Card from "@mui/material/Card";

import FileDrop from "./file-drop";
import { Summary } from "@/components/dashboard/overview/summary";
import { Modal8 } from "@/components/widgets/modals/modal-8";
import { SummaryPending } from "@/components/dashboard/overview/summary-pending";

import Image from "next/image";
const dataExampleDemo = "/assets/dataExampleDemo.png";

// export const metadata = { title: `Overview | Dashboard | ${config.site.name}` };

export default function Page() {
  return (
    <Box
      sx={{
        maxWidth: "var(--Content-maxWidth)",
        m: "var(--Content-margin)",
        p: "var(--Content-padding)",
        width: "var(--Content-width)",
      }}
    >
      <Stack spacing={4}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={3}
          sx={{ alignItems: "flex-start" }}
        >
          <Box sx={{ flex: "1 1 auto" }}>
            <Typography variant="h4">Import Data</Typography>
          </Box>
          <div>
            <Stack spacing={1} direction="row">
              <Button
                variant="contained"
                color="secondary"
                // disabled={!deactivateBtn}
              >
                Confirm Import
              </Button>
            </Stack>
          </div>
        </Stack>

        <Grid container spacing={4}>
          <Grid md={6} xs={6}>
            <img
              src={dataExampleDemo}
              alt="Data Example Demo"
              style={{ width: "100%", height: "auto" }}
            />
          </Grid>

          <Grid md={6} xs={6}>
            <img
              src={dataExampleDemo}
              alt="Data Example Demo"
              style={{ width: "100%", height: "auto" }}
            />
          </Grid>

          <Grid md={6} xs={12}>
            <Card>
              <FileDrop title="Import Room Data" />
            </Card>
          </Grid>

          <Grid md={6} xs={12}>
            <Card>
              <FileDrop title="Import Student Data" />
            </Card>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}
