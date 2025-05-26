"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useCapstoneContext } from "@/contexts/capstone-context";
import {
  PencilSimple as EditIcon,
  Trash as TrashIcon,
  X as XIcon,
  Check as CheckIcon,
  Plus as PlusIcon,
} from "@phosphor-icons/react";

export default function RoomDataTable() {
  const { roomData, addRoomData, updateRoomData, deleteRoomData } =
    useCapstoneContext();

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState(null);

  const [newRowOpen, setNewRowOpen] = useState(false);
  const [newRoom, setNewRoom] = useState({ teacherName: "", roomNumber: "" });

  const startEdit = (r) => {
    setEditingId(r.id);
    setEditData({ ...r });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData(null);
  };

  const saveEdit = () => {
    updateRoomData(editingId, editData);
    cancelEdit();
  };

  const handleField = (e, setter) =>
    setter((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const addRow = () => {
    if (newRoom.teacherName && newRoom.roomNumber) {
      addRoomData(newRoom);
      setNewRoom({ teacherName: "", roomNumber: "" });
      setNewRowOpen(false);
    }
  };

  if (roomData.length === 0 && !newRowOpen) {
    return (
      <Box textAlign="center" py={4}>
        <Typography color="text.secondary" mb={2}>
          No room data available
        </Typography>
        <Button
          variant="contained"
          color="info"
          startIcon={<PlusIcon size={18} />}
          onClick={() => setNewRowOpen(true)}
        >
          Add room
        </Button>
      </Box>
    );
  }

  return (
    <Paper variant="outlined">
      <TableContainer sx={{ height: 480 }}>
        <Table stickyHeader size="medium">
          <TableHead>
            <TableRow sx={{ backgroundColor: "action.hover" }}>
              <TableCell sx={{ fontWeight: 600 }}>Teacher name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Room #</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {roomData.map((row) =>
              editingId === row.id ? (
                <TableRow key={row.id}>
                  <TableCell>
                    <TextField
                      variant="standard"
                      name="teacherName"
                      value={editData.teacherName}
                      onChange={(e) => handleField(e, setEditData)}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      variant="standard"
                      name="roomNumber"
                      value={editData.roomNumber}
                      onChange={(e) => handleField(e, setEditData)}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton color="success" onClick={saveEdit}>
                      <CheckIcon size={18} />
                    </IconButton>
                    <IconButton onClick={cancelEdit}>
                      <XIcon size={18} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow
                  key={row.id}
                  hover
                  sx={{ "&:last-child td": { borderBottom: 0 } }}
                >
                  <TableCell>{row.teacherName}</TableCell>
                  <TableCell>{row.roomNumber}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="info"
                      onClick={() => startEdit(row)}
                      sx={{ mr: 1 }}
                    >
                      <EditIcon size={18} />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() =>
                        window.confirm("Delete this room?") &&
                        deleteRoomData(row.id)
                      }
                    >
                      <TrashIcon size={18} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ),
            )}

            {/* add‑new row -------------------------------------------------- */}
            {newRowOpen && (
              <TableRow sx={{ backgroundColor: "action.hover" }}>
                <TableCell>
                  <TextField
                    variant="standard"
                    name="teacherName"
                    placeholder="Teacher name"
                    value={newRoom.teacherName}
                    onChange={(e) => handleField(e, setNewRoom)}
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="standard"
                    name="roomNumber"
                    placeholder="Room #"
                    value={newRoom.roomNumber}
                    onChange={(e) => handleField(e, setNewRoom)}
                    fullWidth
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton color="success" onClick={addRow} sx={{ mr: 1 }}>
                    <CheckIcon size={18} />
                  </IconButton>
                  <IconButton onClick={() => setNewRowOpen(false)}>
                    <XIcon size={18} />
                  </IconButton>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* footer add‑button -------------------------------------------------- */}
      {!newRowOpen && (
        <Box
          sx={{
            p: 1.5,
            borderTop: 1,
            borderColor: "divider",
            textAlign: "center",
          }}
        >
          <Button
            startIcon={<PlusIcon size={18} />}
            onClick={() => setNewRowOpen(true)}
            variant="contained"
            color="info"
          >
            Add room
          </Button>
        </Box>
      )}
    </Paper>
  );
}
