'use client';

import * as React from "react";

import { config } from "@/config";
import { CapstoneOverview } from "@/components/dashboard/capstone/overview/capstone-overview"
import StudentDashboard from "@/components/dashboard/student/dashboard/student-dashboard";
import { useUser } from "@/hooks/use-user";

export default function Page() {
  

  const auth = useUser();

  // return (
  //   <CapstoneOverview/>
  // );

  // Placeholder for future content

  if (auth.userData.role === 'user') {
    return <StudentDashboard />;
  }

  return <CapstoneOverview />; // Default to CapstoneOverview for other roles
}
