import { useQuery, useMutation } from "@tanstack/react-query";
import { getTotalSignups, addSignup, getMetadata, closeSignup } from "@/services/firebase/firebase-service";

// hook for total signups
export const useTotalSignups = (schoolID) => {
  return useQuery({
    queryKey: ["totalSignups", schoolID], // Cache key — unique per school
    queryFn: () => getTotalSignups(schoolID),
    enabled: Boolean(schoolID) // Only fetch if schoolID exists
  });
};

// hook for adding a signup
export const useAddSignup = () => {
  return useMutation({
    mutationFn: (signupData) => addSignup(signupData)
  });
};

// for getting metadata
export const useMetadata = (schoolID) => {
  return useQuery({
    queryKey: ["metadata", schoolID], // Cache key for metadata query
    queryFn: () => getMetadata(schoolID),
    enabled: Boolean(schoolID), // Only fetch if schoolID exists
  });
};

// hook for closing signups
export const useCloseSignup = () => {
  return useMutation({
    mutationFn: (orgId) => closeSignup(orgId),
  });
};