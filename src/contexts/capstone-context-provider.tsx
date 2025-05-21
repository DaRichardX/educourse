"use client";

import React, { useState } from "react";
import { CapstoneContext } from "./capstone-context";
import { toast } from "sonner";
import type { CapstoneContextType } from "./capstone-context";
import type {
  ImportType,
  RoomData,
  StudentData,
  ValidationError,
} from "@/types/capstone-types";

export function CapstoneProvider({ children }: { children: React.ReactNode }) {
  const [importType, setImportType] = useState<ImportType>("room");
  const [roomData, setRoomData] = useState<RoomData[]>([]);
  const [studentData, setStudentData] = useState<StudentData[]>([]);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    [],
  );
  const [isAuditView, setIsAuditView] = useState(false);

  const addRoomData = (data: RoomData) => {
    const newRoom = { ...data, id: data.id || `room-${Date.now()}` };
    setRoomData((prev) => [...prev, newRoom]);

    toast.success("Room Added", {
      description: `Added room ${newRoom.roomNumber}`,
    });
  };

  const addStudentData = (data: StudentData) => {
    const newStudent = { ...data, id: data.id || `student-${Date.now()}` };
    setStudentData((prev) => [...prev, newStudent]);

    toast.success("Student Added", {
      description: `Added ${newStudent.studentName}`,
    });
  };

  const updateRoomData = (id: string, data: RoomData) => {
    setRoomData((prev) =>
      prev.map((room) => (room.id === id ? { ...data, id } : room)),
    );
    toast.success("Room Updated", {
      description: `Updated room ${data.roomNumber}`,
    });
  };

  const updateStudentData = (id: string, data: StudentData) => {
    setStudentData((prev) =>
      prev.map((student) => (student.id === id ? { ...data, id } : student)),
    );
    toast.success("Student Updated", {
      description: `Updated ${data.studentName}`,
    });
  };

  const deleteRoomData = (id: string) => {
    const room = roomData.find((r) => r.id === id);
    setRoomData((prev) => prev.filter((r) => r.id !== id));

    if (room) {
      toast.success("Room Deleted", {
        description: `Deleted room ${room.roomNumber}`,
      });
    }
  };

  const deleteStudentData = (id: string) => {
    const student = studentData.find((s) => s.id === id);
    setStudentData((prev) => prev.filter((s) => s.id !== id));

    if (student) {
      toast.success("Student Deleted", {
        description: `Deleted ${student.studentName}`,
      });
    }
  };

  const contextValue: CapstoneContextType = {
    importType,
    setImportType,
    roomData,
    studentData,
    validationErrors,
    setValidationErrors,
    setRoomData,
    setStudentData,
    addRoomData,
    addStudentData,
    updateRoomData,
    updateStudentData,
    deleteRoomData,
    deleteStudentData,
    isAuditView,
    setIsAuditView,
  };

  return (
    <CapstoneContext.Provider value={contextValue}>
      {children}
    </CapstoneContext.Provider>
  );
}
