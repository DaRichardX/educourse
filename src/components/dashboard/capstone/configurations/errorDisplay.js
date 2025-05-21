"use client";

import React from "react";
import {
  Alert,
  AlertTitle,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { WarningCircle } from "@phosphor-icons/react"; //  ❱❱  any icon you like

/**
 * @typedef {{ row?: number|string, column: string, message: string }} ValidationError
 * @param {{ errors: ValidationError[] }} props
 */
export default function ErrorDisplay({ errors = [] }) {
  if (!errors.length) return null;

  const theme = useTheme();

  return (
    <Box sx={{ mb: 4 }}>
      {/* summary banner */}
      <Alert severity="error" icon={<WarningCircle weight="fill" />}>
        <AlertTitle sx={{ fontWeight: 600 }}>Import Errors</AlertTitle>
        Please fix the following issues in your file …
      </Alert>

      {/* table of individual errors */}
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          mt: 2,
          maxHeight: 260,
          overflow: "auto",
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: theme.palette.action.hover }}>
              <TableCell sx={{ fontWeight: 700 }}>Row</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Column</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Error</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {errors.map((err, idx) => (
              <TableRow
                key={idx}
                hover
                sx={{
                  "&:last-of-type td, &:last-of-type th": { borderBottom: 0 },
                }}
              >
                <TableCell>{err.row ?? "—"}</TableCell>
                <TableCell>{err.column}</TableCell>
                <TableCell>
                  <Typography variant="body2">{err.message}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
