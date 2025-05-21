import { AuthStrategy } from "@/lib/auth/strategy";
import { getSiteURL } from "@/lib/get-site-url";
import { LogLevel } from "@/lib/logger";

export const config = {
  site: {
    name: "EduCourse",
    description: "",
    language: "en",
    colorScheme: "light",
    themeColor: "#090a0b",
    primaryColor: "neonBlue",
    url: getSiteURL(),
    version: process.env.NEXT_PUBLIC_SITE_VERSION || "0.0.0",
  },
  logLevel: process.env.NEXT_PUBLIC_LOG_LEVEL || LogLevel.ALL,
  auth: { strategy: AuthStrategy.FIREBASE },
  firebase: {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  },
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  mapbox: { apiKey: process.env.NEXT_PUBLIC_MAPBOX_API_KEY },
  gtm: { id: process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID },
};
