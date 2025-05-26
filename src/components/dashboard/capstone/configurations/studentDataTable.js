"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Chip,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import {
  PencilSimple as EditIcon,
  Trash as TrashIcon,
  X as XIcon,
  Check as CheckIcon,
  Plus as PlusIcon,
} from "@phosphor-icons/react";
import { useCapstoneContext } from "@/contexts/capstone-context";

export default function StudentDataTable() {
  const { studentData, addStudentData, updateStudentData, deleteStudentData } =
    useCapstoneContext();

  const [editingId, setEditingId] = useState(null);
  const [editRow, setEditRow] = useState(null);

  const [adding, setAdding] = useState(false);
  const [newRow, setNewRow] = useState({
    studentName: "",
    studentEmail: "",
    studentRole: "viewer",
    topicDescription: "",
  });

  const emailOK = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const startEdit = (r) => {
    setEditingId(r.id);
    setEditRow({ ...r });
  };
  const cancelEdit = () => {
    setEditingId(null);
    setEditRow(null);
  };
  const saveEdit = () => {
    if (!emailOK(editRow.studentEmail)) {
      window.alert("Enter a valid email");
      return;
    }
    updateStudentData(editingId, editRow);
    cancelEdit();
  };

  const addRow = () => {
    if (!newRow.studentName || !emailOK(newRow.studentEmail)) {
      window.alert("Fill all required fields with valid values");
      return;
    }
    addStudentData(newRow);
    setNewRow({
      studentName: "",
      studentEmail: "",
      studentRole: "viewer",
      topicDescription: "",
    });
    setAdding(false);
  };

  const field = (e, setter) =>
    setter((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  /* ------------------------- render ------------------------- */
  if (studentData.length === 0 && !adding) {
    return (
      <Box textAlign="center" py={6}>
        <Typography color="text.secondary" mb={2}>
          No student data available
        </Typography>
        <Button
          color="info"
          variant="contained"
          startIcon={<PlusIcon size={18} />}
          onClick={() => setAdding(true)}
        >
          Add student
        </Button>
      </Box>
    );
  }

  return (
    <Paper variant="outlined">
      <TableContainer sx={{ height: 480 }}>
        <Table stickyHeader size="medium">
          <TableHead>
            <TableRow sx={{ bgcolor: "action.hover" }}>
              <TableCell sx={{ fontWeight: 600 }}>Student name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Role</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Topic</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {/* existing rows */}
            {studentData.map((s) =>
              editingId === s.id ? (
                <TableRow key={s.id}>
                  <TableCell>
                    <TextField
                      variant="standard"
                      name="studentName"
                      value={editRow.studentName}
                      onChange={(e) => field(e, setEditRow)}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      variant="standard"
                      name="studentEmail"
                      type="email"
                      value={editRow.studentEmail}
                      onChange={(e) => field(e, setEditRow)}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell width={120}>
                    <Select
                      size="small"
                      value={editRow.studentRole}
                      onChange={(e) =>
                        setEditRow((p) => ({
                          ...p,
                          studentRole: e.target.value,
                        }))
                      }
                      fullWidth
                    >
                      <MenuItem value="presenter">Presenter</MenuItem>
                      <MenuItem value="viewer">Viewer</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <TextField
                      variant="standard"
                      name="topicDescription"
                      value={editRow.topicDescription}
                      onChange={(e) => field(e, setEditRow)}
                      disabled={editRow.studentRole === "viewer"}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="success"
                      onClick={saveEdit}
                      sx={{ mr: 1 }}
                    >
                      <CheckIcon size={18} />
                    </IconButton>
                    <IconButton onClick={cancelEdit}>
                      <XIcon size={18} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow key={s.id} hover>
                  <TableCell>{s.studentName}</TableCell>
                  <TableCell>{s.studentEmail}</TableCell>
                  <TableCell>
                    <Chip
                      label={
                        s.studentRole.charAt(0).toUpperCase() +
                        s.studentRole.slice(1)
                      }
                      size="small"
                      variant="outlined"
                      color={s.studentRole === "presenter" ? "info" : "default"}
                    />
                  </TableCell>
                  <TableCell>
                    {s.studentRole === "presenter" ? (
                      s.topicDescription || (
                        <Typography color="text.disabled" fontStyle="italic">
                          No topic
                        </Typography>
                      )
                    ) : (
                      <Typography color="text.disabled">N/A</Typography>
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="info"
                      onClick={() => startEdit(s)}
                      sx={{ mr: 1 }}
                    >
                      <EditIcon size={18} />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() =>
                        window.confirm("Delete this student?") &&
                        deleteStudentData(s.id)
                      }
                    >
                      <TrashIcon size={18} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ),
            )}

            {/* add‑new row */}
            {adding && (
              <TableRow sx={{ bgcolor: "action.hover" }}>
                <TableCell>
                  <TextField
                    variant="standard"
                    name="studentName"
                    value={newRow.studentName}
                    onChange={(e) => field(e, setNewRow)}
                    placeholder="Student name"
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="standard"
                    name="studentEmail"
                    type="email"
                    value={newRow.studentEmail}
                    onChange={(e) => field(e, setNewRow)}
                    placeholder="student@example.com"
                    fullWidth
                  />
                </TableCell>
                <TableCell width={120}>
                  <Select
                    size="small"
                    value={newRow.studentRole}
                    onChange={(e) =>
                      setNewRow((p) => ({ ...p, studentRole: e.target.value }))
                    }
                    fullWidth
                  >
                    <MenuItem value="presenter">Presenter</MenuItem>
                    <MenuItem value="viewer">Viewer</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  <TextField
                    variant="standard"
                    name="topicDescription"
                    value={newRow.topicDescription}
                    onChange={(e) => field(e, setNewRow)}
                    disabled={newRow.studentRole === "viewer"}
                    placeholder={
                      newRow.studentRole === "presenter"
                        ? "Topic description"
                        : "N/A for viewers"
                    }
                    fullWidth
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton color="success" onClick={addRow} sx={{ mr: 1 }}>
                    <CheckIcon size={18} />
                  </IconButton>
                  <IconButton onClick={() => setAdding(false)}>
                    <XIcon size={18} />
                  </IconButton>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* footer add button */}
      {!adding && (
        <Box
          sx={{
            p: 1.5,
            borderTop: 1,
            borderColor: "divider",
            textAlign: "center",
          }}
        >
          <Button
            variant="contained"
            startIcon={<PlusIcon size={18} />}
            onClick={() => setAdding(true)}
            color="info"
          >
            Add student
          </Button>
        </Box>
      )}
    </Paper>
  );
}
