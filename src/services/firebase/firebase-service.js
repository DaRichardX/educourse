import { getFirestore, getDoc, doc } from "firebase/firestore";
import { getFirebaseAuth } from '@/lib/auth/firebase/client';
import { logger } from '@/lib/default-logger';

// Initialize Firestore
const firestore = getFirestore();
const auth = getFirebaseAuth();

const FIREBASE_FUNCTIONS_DOMAIN = "https://us-central1-educourse-e0c66.cloudfunctions.net/api";


export const getTotalSignups = async (schoolID) => {
  if (!schoolID) throw new Error("Missing school ID");

  try {
    const signupsDocRef = doc(firestore, `orgs/${schoolID}/capstone_schedule/signups`);
    const signupsDocSnapshot = await getDoc(signupsDocRef);

    if (!signupsDocSnapshot.exists()) {
      throw new Error("Signups document not found");
    }

    const signupsData = signupsDocSnapshot.data();
    logger.debug("[Data] Signups: ", signupsData);

    const totalSignups = Object.keys(signupsData).length;
    return totalSignups;
  } catch (error) {
    logger.error("[Data] Error fetching students list: ", error);
    throw new Error("Failed to fetch signups");
  }
};
// addSignup: add a capstone signup to the orgId provided
// props: {orgId: string, name: string)
export const addSignup = async (signup) => {
  const orgId = signup.orgId;
  const room = signup.room;
  const name = signup.name;

  const endpoint = `/org/${orgId}/capstone/signups`;

  const response = await makeAuthenticatedRequest(endpoint, "POST", {name, room});

  logger.debug("Added Signup", response);
  return response;
};

// makeAuthenticatedRequest: needs to have a valid user w/ token
const makeAuthenticatedRequest = async (endpoint, method, body) => {
  if (!auth.currentUser) {
    throw new Error("Missing current user");
  }

  const token = await auth.currentUser.getIdToken(); // Firebase request token

  const response = await fetch(`${FIREBASE_FUNCTIONS_DOMAIN}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: method !== "GET" ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const errorData = await response.json();
    logger.error(`Request returned w/ ${response.status}: `, errorData.message || "<No Error Message Attached>")
    throw new Error(errorData.message || "<No Error Message Attached>");
  }

  return await response.json();
};