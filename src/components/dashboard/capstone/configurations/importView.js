"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { toast } from "sonner";

import { useCapstoneContext } from "@/contexts/capstone-context";
import { parseFile } from "@/lib/parseCSV";
import FileDropzone from "./fileDropZone";
import ErrorDisplay from "./errorDisplay";

export default function ImportView() {
  const {
    importType, // "room" | "student"
    setImportType,
    setRoomData,
    setStudentData,
    setIsAuditView,
    roomData,
    studentData,
  } = useCapstoneContext();

  const [loading, setLoading] = useState(false);
  const [lastFileName, setLastFileName] = useState({
    room: "",
    student: "",
  });

  const [tabErrors, setTabErrors] = useState({
    room: [],
    student: [],
  });

  /* ─────────────────────────────  upload  ───────────────────────────── */

  const handleFileAccepted = async (file) => {
    setLoading(true);

    // store filename **and** clear old errors for this tab immediately
    setLastFileName((p) => ({ ...p, [importType]: file.name }));
    setTabErrors((p) => ({ ...p, [importType]: [] }));

    try {
      const res = await parseFile(file, importType); // calls XLSX / Papa etc.
      processResult(res, importType);
    } catch (err) {
      console.error(err);
      toast.error("Failed to process the file");
    } finally {
      setLoading(false);
    }
  };

  const processResult = (res, type) => {
    if (res.errors.length) {
      setTabErrors((p) => ({ ...p, [type]: res.errors }));
      toast.error(`Found ${res.errors.length} errors in your file`);
      return;
    }

    setTabErrors((p) => ({ ...p, [type]: [] }));

    if (res.data.length === 0) {
      toast.error("The file contains no valid data");
      return;
    }

    if (type === "room") {
      setRoomData(res.data);
      toast.success(`Imported ${res.data.length} room records`);
    } else {
      setStudentData(res.data);
      toast.success(`Imported ${res.data.length} student records`);
    }

    const hasRoom = type === "room" ? res.data.length > 0 : roomData.length > 0;
    const hasStudent =
      type === "student" ? res.data.length > 0 : studentData.length > 0;
    if (hasRoom && hasStudent) setIsAuditView(true);
  };

  /* ────────────────────────────  helpers  ──────────────────────────── */

  const columnsHelp = {
    room: "teacherName, roomNumber",
    student:
      "studentName, studentEmail, studentRole, topicDescription (optional for presenters)",
  };

  const recordCount =
    importType === "room" ? roomData.length : studentData.length;

  /* ───────────────────────────────  UI  ─────────────────────────────── */

  return (
    <Box sx={{ animation: "fadeIn .3s ease" }}>
      <Tabs
        value={importType}
        onChange={(_, v) => setImportType(v)}
        sx={{ mb: 3 }}
      >
        <Tab value="room" label="Room Import" />
        <Tab value="student" label="Student Import" />
      </Tabs>

      <Card variant="outlined">
        <CardHeader
          title={
            <Typography variant="h6" fontWeight={600}>
              {importType === "room" ? "Room Import" : "Student Import"}
            </Typography>
          }
        />

        <CardContent>
          {/* expected columns */}
          <Typography variant="body2" color="text.secondary" mb={1}>
            Your file should include the following columns:
          </Typography>

          <Box
            sx={{
              display: "flex",
              bgcolor: "background.level1",
              p: 2,
              borderRadius: 1,
              fontFamily: "monospace",
              fontSize: 14,
              mb: 4,
              gap: 2,
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Typography fontSize={{ xs: "0.8rem", sm: "1rem" }}>
              {columnsHelp[importType]}
            </Typography>

            <Button
              size="small"
              variant="outlined"
              color="info"
              onClick={
                importType === "room"
                  ? downloadRoomCsvTemplate
                  : downloadStudentCsvTemplate
              }
            >
              Download template
            </Button>
          </Box>

          {/* drop zone */}
          <FileDropzone
            importType={importType}
            onFileAccepted={handleFileAccepted}
          />

          {/* last uploaded filename */}
          {lastFileName[importType] && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 1, fontStyle: "italic" }}
            >
              Last uploaded:&nbsp;<strong>{lastFileName[importType]}</strong>
            </Typography>
          )}

          {/* spinner */}
          {loading && (
            <Box sx={{ mt: 3, textAlign: "center" }}>
              <CircularProgress size={28} />
            </Box>
          )}
        </CardContent>
      </Card>

      {tabErrors[importType].length > 0 && (
        <Box mt={4}>
          <ErrorDisplay errors={tabErrors[importType]} />
        </Box>
      )}
    </Box>
  );
}

/* ───────────────────────── template download helpers ───────────────────── */

export function downloadRoomCsvTemplate() {
  const header = ["teacherName", "roomNumber"];
  const csv = "\uFEFF" + header.join(",") + "\n";
  triggerDownload(csv, "room-data-template.csv");
}

export function downloadStudentCsvTemplate() {
  const header = [
    "studentName",
    "studentEmail",
    "studentRole",
    "topicDescription",
  ];
  const csv = "\uFEFF" + header.join(",") + "\n";
  triggerDownload(csv, "student-data-template.csv");
}

function triggerDownload(csv, filename) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = Object.assign(document.createElement("a"), {
    href: url,
    download: filename,
  });
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
