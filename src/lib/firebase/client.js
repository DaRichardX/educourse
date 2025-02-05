"use client";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { config } from "@/config";

// Cache the Firebase app instance to avoid re-initialization.
let appInstance;

export function getFirebaseApp() {
  if (appInstance) {
    return appInstance;
  }

  appInstance = initializeApp({
    apiKey: config.firebase.apiKey,
    authDomain: config.firebase.authDomain,
    projectId: config.firebase.projectId,
    storageBucket: config.firebase.storageBucket,
    messagingSenderId: config.firebase.messagingSenderId,
    appId: config.firebase.appId,
  });

  return appInstance;
}

// Firebase Auth instance: couldnt find this anywhere else
export function getFirebaseAuth() {
  return getAuth(getFirebaseApp());
}
