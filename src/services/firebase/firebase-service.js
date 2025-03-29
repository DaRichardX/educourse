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

export const getMetadata = async (schoolID) => {
  if (!schoolID) throw new Error("Missing school ID");

  try {
    // Reference to the metadata document inside the capstone_schedule collection
    const metadataDocRef = doc(firestore, `orgs/${schoolID}/capstone_schedule/metadata`);
    
    // Fetch the document
    const metadataDocSnapshot = await getDoc(metadataDocRef);

    // Check if document exists
    if (!metadataDocSnapshot.exists()) {
      throw new Error("Metadata document not found");
    }

    // Get the metadata data from the document
    const metadata = metadataDocSnapshot.data();
    logger.debug("[Data] Metadata: ", metadata);

    return metadata;
  } catch (error) {
    logger.error("[Data] Error fetching metadata: ", error);
    throw new Error("Failed to fetch metadata");
  }
};

export const closeSignup = async (orgId) => {
  if (!orgId) throw new Error("Missing organization ID");

  const endpoint = `/org/specific/${orgId}/capstone/status`;

  const body = {
    isSignupClosed: true,  // Closing the signup
  };

  try {
    // Make authenticated request to the backend to update the signup status
    const response = await makeAuthenticatedRequest(endpoint, "PATCH", body);

    logger.debug("Signup status successfully closed", response);
    return response;
  } catch (error) {
    logger.error("Error closing signup status:", error);
    throw new Error("Failed to close the signup");
  }
};

// addSignup: Add a capstone signup to the orgId provided
// props: {orgId: string, signupId: string, student: string, roomId: string}
// comment: questionable use of ?id=signupId instead of putting in body, TODO: change in the future.
export const addSignup = async (signup) => {
  const { orgId, signupId, student, roomId } = signup;

  const endpoint = `/api/public/org/specific/${orgId}/capstone/signups?id=${signupId}`;

  // Sending a POST request to the backend
  const response = await makeAuthenticatedRequest(endpoint, "POST", { student, room_id: roomId });

  logger.debug("Added Signup:", response);
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