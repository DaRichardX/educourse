"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useCapstoneContext } from "@/contexts/capstone-context";
import AuditView from "@/components/dashboard/capstone/configurations/auditView";
import ImportView from "@/components/dashboard/capstone/configurations/importView";
import { ArrowRight } from "@phosphor-icons/react";

export default function Page() {
  const { isAuditView, setIsAuditView } = useCapstoneContext();

  const handleBack = () => {
    setIsAuditView(!isAuditView);
  };

  return (
    <Box
      sx={{
        maxWidth: "var(--Content-maxWidth)",
        m: "var(--Content-margin)",
        p: "var(--Content-padding)",
        width: "var(--Content-width)",
      }}
    >
      <Stack spacing={4}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={3}
          sx={{ alignItems: "center" }}
        >
          <Box sx={{ flex: "1 1 auto" }}>
            <Typography
              variant="h3"
              fontWeight={600}
              textAlign={{ xs: "center", sm: "left" }}
            >
              Capstone Configurations
            </Typography>
          </Box>

          <Button onClick={handleBack}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body1" fontWeight={500}>
                {isAuditView ? "Import Data" : "Audit Data"}
              </Typography>
              <ArrowRight weight="bold" />
            </Stack>
          </Button>
        </Stack>

        <main>
          <ConfigContent />
        </main>
      </Stack>
    </Box>
  );
}

const ConfigContent = () => {
  const { isAuditView } = useCapstoneContext();

  return (
    <div className="container mx-auto px-4 py-8">
      {isAuditView ? <AuditView /> : <ImportView />}
    </div>
  );
};
