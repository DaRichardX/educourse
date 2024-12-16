import * as React from "react";

import { config } from "@/config";
import { CapstoneOverview } from "@/components/dashboard/capstone/overview/capstone-overview"

export const metadata = { title: `Overview | Dashboard | ${config.site.name}` };

export default function Page() {

  return (
    <CapstoneOverview/>
  );
}
