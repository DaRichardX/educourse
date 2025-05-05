import * as React from "react";

import { config } from "@/config";
import { Faqs } from "@/components/marketing/home/faqs";
import { Hero } from "@/components/marketing/home/hero";
import { Included } from "@/components/marketing/home/included";
import { StartBuilding } from "@/components/marketing/home/start-building";
import { Box } from "@mui/system";

export const metadata = {
  title: config.site.name,
  description: config.site.description,
};

export default function Page() {
  //redirect("/auth/sign-in")
  //^^ page lock
  return (
    <div>
      <Hero />
      <Box
        sx={{
          position: "relative",
          height: "16px",
          width: "100vw",
          bgcolor: "white",
          zIndex: 99999,
        }}
      />
      <Included />
      <Faqs />
      <StartBuilding />
    </div>
  );
}
