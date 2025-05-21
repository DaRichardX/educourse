import Papa from "papaparse";
import * as XLSX from "xlsx";
import { ImportType, ValidationError } from "@/types/capstone-types";

interface ParseResult<T> {
  data: T[];
  errors: ValidationError[];
}

export const parseFile = async <T>(
  file: File,
  importType: ImportType,
): Promise<ParseResult<T>> => {
  const fileExtension = file.name.split(".").pop()?.toLowerCase();

  try {
    let rawData: any[] = [];

    if (fileExtension === "csv") {
      // Parse CSV using PapaParse
      const result = await new Promise<Papa.ParseResult<any>>(
        (resolve, reject) => {
          Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: resolve,
            error: reject,
          });
        },
      );

      rawData = result.data;
    } else if (["xls", "xlsx"].includes(fileExtension || "")) {
      // Parse Excel files using XLSX
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      rawData = XLSX.utils.sheet_to_json(worksheet);
    } else {
      throw new Error(`Unsupported file format: ${fileExtension}`);
    }

    return validateData(rawData, importType);
  } catch (error) {
    console.error("Error parsing file:", error);
    return {
      data: [],
      errors: [
        {
          row: 0,
          column: "file",
          message: `Error parsing file: ${error instanceof Error ? error.message : "Unknown error"}`,
        },
      ],
    } as ParseResult<T>;
  }
};

const validateData = <T>(
  data: any[],
  importType: ImportType,
): ParseResult<T> => {
  const errors: ValidationError[] = [];
  const validData: any[] = [];

  data.forEach((row, index) => {
    const rowNumber = index + 2; // +2 because we're 0-indexed and row 1 is the header
    const rowErrors: ValidationError[] = [];

    if (importType === "room") {
      // Validate room data
      if (!row.teacherName || typeof row.teacherName !== "string") {
        rowErrors.push({
          row: rowNumber,
          column: "teacherName",
          message: "Teacher name is required and must be text",
        });
      }

      if (
        !row.roomNumber ||
        (typeof row.roomNumber !== "string" &&
          typeof row.roomNumber !== "number")
      ) {
        rowErrors.push({
          row: rowNumber,
          column: "roomNumber",
          message: "Room number is required",
        });
      }

      // If no errors, add to valid data with string roomNumber
      if (rowErrors.length === 0) {
        validData.push({
          ...row,
          id: `room-${rowNumber}-${Date.now()}`,
          roomNumber: row.roomNumber.toString(),
        });
      }
    } else if (importType === "student") {
      // Validate student data
      if (!row.studentName || typeof row.studentName !== "string") {
        rowErrors.push({
          row: rowNumber,
          column: "studentName",
          message: "Student name is required and must be text",
        });
      }

      if (
        !row.studentEmail ||
        typeof row.studentEmail !== "string" ||
        !isValidEmail(row.studentEmail)
      ) {
        rowErrors.push({
          row: rowNumber,
          column: "studentEmail",
          message: "Valid student email is required",
        });
      }

      if (
        !row.studentRole ||
        !["presenter", "viewer"].includes(row.studentRole.toLowerCase())
      ) {
        rowErrors.push({
          row: rowNumber,
          column: "studentRole",
          message: 'Student role must be either "presenter" or "viewer"',
        });
      } else {
        // Convert to lowercase for consistency
        row.studentRole = row.studentRole.toLowerCase();
      }

      // Topic description is only required for presenters
      if (
        row.studentRole?.toLowerCase() === "presenter" &&
        !row.topicDescription
      ) {
        // This is not a hard error, but we'll flag it
        console.warn(
          `Warning: Presenter at row ${rowNumber} has no topic description`,
        );
      }

      // If no errors, add to valid data
      if (rowErrors.length === 0) {
        validData.push({
          ...row,
          id: `student-${rowNumber}-${Date.now()}`,
          studentRole: row.studentRole.toLowerCase(),
        });
      }
    }

    errors.push(...rowErrors);
  });

  return {
    data: validData as T[],
    errors,
  };
};

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
