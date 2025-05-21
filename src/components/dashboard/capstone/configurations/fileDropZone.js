"use client";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { UploadSimple } from "@phosphor-icons/react";

/**
 * @param {{ onFileAccepted: (f:File)=>void, importType:'room'|'student' }} props
 */
export default function FileDropzone({ onFileAccepted, importType }) {
  const theme = useTheme();

  const onDrop = useCallback(
    (files) => {
      if (files?.length) onFileAccepted(files[0]);
    },
    [onFileAccepted],
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
    maxFiles: 1,
  });

  /* dynamic border colour */
  const borderColor = isDragReject
    ? theme.palette.error.main
    : isDragAccept
      ? "rgba(0, 113, 227, 0.5)"
      : isDragActive
        ? theme.palette.primary.main
        : theme.palette.divider;

  return (
    <Box
      {...getRootProps()}
      sx={{
        p: 4,
        border: `2px dashed ${borderColor}`,
        borderRadius: 2,
        textAlign: "center",
        cursor: "pointer",
        bgcolor: isDragActive ? "rgba(0, 113, 227, 0.05)" : "transparent",
        transition: "background-color 0.2s, border-color 0.2s",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <input {...getInputProps()} />

      <UploadSimple size={48} color={theme.palette.text.disabled} />

      <Typography variant="h6" sx={{ mt: 2, fontWeight: 600 }}>
        {importType === "room" ? "Upload Room Data" : "Upload Student Data"}
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 3, maxWidth: 500 }}
      >
        Drag & drop your&nbsp;
        {importType === "room" ? "room" : "student"} data file here or click to
        browse.
      </Typography>

      <Typography variant="caption" color="text.disabled" sx={{ mt: 0.5 }}>
        Accepts CSV, XLS, XLSX formats
      </Typography>

      <Button
        variant="contained"
        sx={{ mt: 3, px: 4 }}
        onClick={(e) => {
          /* open the native file dialog without bubbling to the drop‑area */
          e.stopPropagation();
          e.currentTarget
            .closest('[role="presentation"]')
            .querySelector("input[type=file]")
            .click();
        }}
      >
        Select File
      </Button>
    </Box>
  );
}
