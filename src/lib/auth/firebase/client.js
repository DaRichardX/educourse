"use client";

import { getAuth } from "firebase/auth";
import { config } from "@/config";

import { getFirebaseApp } from "@/lib/firebase/client";

export function getFirebaseAuth() {
  return getAuth(getFirebaseApp());
}
