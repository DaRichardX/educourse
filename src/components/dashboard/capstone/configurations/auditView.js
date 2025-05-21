"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Tab,
  Tabs,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
  DialogContentText,
} from "@mui/material";
import { Question } from "@phosphor-icons/react";
import { toast } from "sonner";

import { useCapstoneContext } from "@/contexts/capstone-context";
import RoomDataTable from "./roomDataTable";
import StudentDataTable from "./studentDataTable";
import { Stack } from "@mui/system";

export default function AuditView() {
  const { importType, setImportType, roomData, studentData } =
    useCapstoneContext();

  const theme = useTheme();
  const isMonitor = useMediaQuery("(max-width:1600px)");
  const [helpOpen, setHelpOpen] = useState(null);

  const RoomCard = (
    <Card elevation={3}>
      <CardHeader
        title="Room Data Management"
        subheader="View, edit or add room information"
        action={
          <Tooltip title="Room data help">
            <IconButton size="small" onClick={() => setHelpOpen("room")}>
              <Question size={18} weight="bold" />
            </IconButton>
          </Tooltip>
        }
      />
      <CardContent>
        <RoomDataTable />
      </CardContent>
    </Card>
  );

  const StudentCard = (
    <Card elevation={3}>
      <CardHeader
        title="Student Data Management"
        subheader="View, edit or add student information"
        action={
          <Tooltip title="Student data help">
            <IconButton size="small" onClick={() => setHelpOpen("student")}>
              <Question size={18} weight="bold" />
            </IconButton>
          </Tooltip>
        }
      />
      <CardContent>
        <StudentDataTable />
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ animation: "fade-in 300ms ease" }}>
      {isMonitor ? (
        <>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems={"start"}
            justifyContent={"space-between"}
            mb={{ xs: 3, sm: 0 }}
            spacing={{ xs: 0, sm: 3 }}
          >
            <Tabs
              value={importType}
              onChange={(_, val) => setImportType(val)}
              centered
              sx={{
                mb: 3,
                display: "flex",
                justifySelf: { xs: "center", sm: "start" },
              }}
            >
              <Tab
                label={
                  <>
                    Room&nbsp;Data&nbsp;
                    {roomData.length ? `(${roomData.length})` : ""}
                  </>
                }
                value="room"
              />
              <Tab
                label={
                  <>
                    Student&nbsp;Data&nbsp;
                    {studentData.length ? `(${studentData.length})` : ""}
                  </>
                }
                value="student"
              />
            </Tabs>

            <SendLinkButton />
          </Stack>

          {importType === "room" ? RoomCard : StudentCard}
        </>
      ) : (
        <Stack>
          <Box
            mb={3}
            mt={-2}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <SendLinkButton />
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              {RoomCard}
            </Grid>
            <Grid item xs={12} md={6}>
              {StudentCard}
            </Grid>
          </Grid>
        </Stack>
      )}

      {/* ---------------- Help dialogs ---------------- */}
      <Dialog
        open={helpOpen === "room"}
        onClose={() => setHelpOpen(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Room Data Instructions</DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2" paragraph>
            Use this table to manage room information:
          </Typography>
          <ul style={{ paddingLeft: 20, margin: 0 }}>
            <li>Teacher Name – full name of the teacher.</li>
            <li>Room Number – e.g. A‑201 or 305.</li>
            <li>Edit / delete rows as needed.</li>
            <li>Click “Add Room” for a new entry.</li>
          </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setHelpOpen(null)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={helpOpen === "student"}
        onClose={() => setHelpOpen(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Student Data Instructions</DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2" paragraph>
            Use this table to manage student information:
          </Typography>
          <ul style={{ paddingLeft: 20, margin: 0 }}>
            <li>Student Name / Email – both required.</li>
            <li>Role – Presenter or Viewer.</li>
            <li>Topic Description – only for Presenters.</li>
            <li>Edit / delete rows as needed.</li>
            <li>Click “Add Student” for a new entry.</li>
          </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setHelpOpen(null)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

async function sendRegistrationLinks() {
  // Simulated latency
  await new Promise((r) => setTimeout(r, 1200));
}

export function SendLinkButton() {
  const { studentData, roomData } = useCapstoneContext();

  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const disabled = studentData.length === 0 || roomData.length === 0;

  const handleSend = async () => {
    setSending(true);
    try {
      await sendRegistrationLinks();
      toast.success("Registration links sent!");
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to send registration links");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="info"
        disabled={disabled}
        onClick={() => setOpen(true)}
      >
        Send Registration Links
      </Button>

      <Dialog
        open={open}
        onClose={() => !sending && setOpen(false)}
        PaperProps={{
          sx: { p: 2 },
        }}
      >
        <DialogTitle sx={{ fontSize: "2rem", fontWeight: 600, mb: 3 }}>
          Confirm Send
        </DialogTitle>

        <DialogContent dividers sx={{ mb: 2 }}>
          <DialogContentText>
            You're about to send registration links to
            <strong> {studentData.length} </strong>
            students for
            <strong> {roomData.length} </strong>
            room{roomData.length !== 1 && "s"}.
            <br />
            Once sent, student emails are dispatched immediately.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)} disabled={sending}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSend}
            disabled={sending}
          >
            {sending ? "Sending…" : "Send"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
