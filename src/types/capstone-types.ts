export type ImportType = "room" | "student";

export interface RoomData {
  id?: string;
  teacherName: string;
  roomNumber: string;
}

export interface StudentData {
  id?: string;
  studentName: string;
  studentEmail: string;
  studentRole: "presenter" | "viewer";
  topicDescription?: string;
}

export type DataItem = RoomData | StudentData;

export interface ValidationError {
  row: number;
  column: string;
  message: string;
}
