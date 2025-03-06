import { getFirestore, getDoc, doc } from "firebase/firestore";
import { getFirebaseAuth } from '@/lib/auth/firebase/client';
import { logger } from '@/lib/default-logger';

// Initialize Firestore
const firestore = getFirestore();
const auth = getFirebaseAuth();
const FIREBASE_FUNCTIONS_DOMAIN = "https://us-central1-educourse-e0c66.cloudfunctions.net/";


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

export const putTest = async () => {
  if (!auth.currentUser) {
    throw new Error("Missing current user");
  }

  const token = await auth.currentUser.getIdToken();

  const response = await fetch(`${FIREBASE_FUNCTIONS_DOMAIN}/api/user/1111`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ message: "" }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to call Firebase function");
  }
  logger.debug("put test success");
  logger.debug(response.json);

  return await response.json();
};