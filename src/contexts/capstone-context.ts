import { createContext, useContext } from "react";
import type {
  ImportType,
  RoomData,
  StudentData,
  ValidationError,
} from "@/types/capstone-types";

export interface CapstoneContextType {
  importType: ImportType;
  setImportType: (type: ImportType) => void;
  roomData: RoomData[];
  studentData: StudentData[];
  validationErrors: ValidationError[];
  setValidationErrors: (errors: ValidationError[]) => void;
  setRoomData: (data: RoomData[]) => void;
  setStudentData: (data: StudentData[]) => void;
  addRoomData: (data: RoomData) => void;
  addStudentData: (data: StudentData) => void;
  updateRoomData: (id: string, data: RoomData) => void;
  updateStudentData: (id: string, data: StudentData) => void;
  deleteRoomData: (id: string) => void;
  deleteStudentData: (id: string) => void;
  isAuditView: boolean;
  setIsAuditView: (isAudit: boolean) => void;
}

export const CapstoneContext = createContext<CapstoneContextType | undefined>(
  undefined,
);

export const useCapstoneContext = () => {
  const context = useContext(CapstoneContext);

  if (!context) {
    throw new Error(
      "useCapstoneContext must be used within a CapstoneProvider",
    );
  }

  return context;
};
