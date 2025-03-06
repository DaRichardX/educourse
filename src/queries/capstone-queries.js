import { useQuery, useMutation } from "@tanstack/react-query";
import { getTotalSignups, putTest } from "@/services/firebase/firebase-service";

export const useTotalSignups = (schoolID) => {
  return useQuery({
    queryKey: ["totalSignups", schoolID], // Cache key — unique per school
    queryFn: () => getTotalSignups(schoolID),
    enabled: Boolean(schoolID) // Only fetch if schoolID exists
  });
};

export const useReqTest = () => {
  return useMutation({
    mutationFn: () => putTest()
  });
};
