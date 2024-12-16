'use client'; //TODO: FIX THIS 

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Check as CheckIcon } from "@phosphor-icons/react/dist/ssr/Check";

export function Modal9({ setModal }) {
  return (
    <Box
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 9999,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          sx={{
            border: "1px solid var(--mui-palette-divider)",
            boxShadow: "var(--mui-shadows-16)",
            p: 3,
          }}
        >
          <Stack spacing={3}>
            <Box sx={{ display: "flex", justifyContent: "center" }}></Box>
            <Stack spacing={1} sx={{ textAlign: "center" }}>
              <Typography variant="h5">Please Try Again</Typography>
              <Typography color="text.secondary" variant="body2">
                Please upload a valid CSV or Excel file.
              </Typography>
            </Stack>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setModal(false)}
            >
              Confirm
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
