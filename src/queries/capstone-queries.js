import { useQuery, useMutation } from "@tanstack/react-query";
import { getTotalSignups, addSignup} from "@/services/firebase/firebase-service";

export const useTotalSignups = (schoolID) => {
  return useQuery({
    queryKey: ["totalSignups", schoolID], // Cache key — unique per school
    queryFn: () => getTotalSignups(schoolID),
    enabled: Boolean(schoolID) // Only fetch if schoolID exists
  });
};

export const useAddSignup = () => {
  return useMutation({
    mutationFn: (signupData) => addSignup(signupData)
  });
};

