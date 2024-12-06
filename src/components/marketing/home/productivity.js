"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { useColorScheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { CodeBlock as CodeBlockIcon } from "@phosphor-icons/react/dist/ssr/CodeBlock";
import { DiamondsFour as DiamondsFourIcon } from "@phosphor-icons/react/dist/ssr/DiamondsFour";
import { Palette as PaletteIcon } from "@phosphor-icons/react/dist/ssr/Palette";
import { Timer as TimerIcon } from "@phosphor-icons/react/dist/ssr/Timer";

import { NoSsr } from "@/components/core/no-ssr";

export function Productivity() {
  const { colorScheme } = useColorScheme();

  return (
    <div>
      <Container maxWidth="lg" sx={{ py: "50px" }}>
        <Stack spacing={8}>
          <Stack
            maxWidth="700px"
            spacing={2}
            sx={{ mx: "auto", marginTop: "0" }}
          >
            <h2 style={{ fontSize: "2rem", margin: "0", textAlign: "center" }}>
              Supercharge your Administrative Productivity.
            </h2>
          </Stack>
          <Grid container spacing={3}>
            <Grid md={8} xs={12}>
              <Box
                sx={{
                  bgcolor: "var(--mui-palette-background-level1)",
                  border: "1px solid var(--mui-palette-divider)",
                  borderRadius: "20px",
                  overflow: "hidden",
                }}
              >
                <Stack spacing={2} sx={{ p: 4 }}>
                  <div>
                    <Chip
                      color="primary"
                      icon={<DiamondsFourIcon />}
                      label="Scheduling"
                      variant="soft"
                    />
                  </div>
                  <Typography variant="h5">Capstone Scheduling</Typography>
                  <Typography color="text.secondary" variant="body2">
                    EduCourse empowers you to seamlessly schedule your
                    school&#39;s capstones, eliminating the hassle of manual
                    selection.
                  </Typography>
                </Stack>
                <Box sx={{ height: "300px", position: "relative" }}>
                  <NoSsr>
                    <Box
                      component="img"
                      src={
                        colorScheme === "dark"
                          ? "/assets/home-feature-2-dark.png"
                          : "/assets/home-feature-2-light.png"
                      }
                      sx={{
                        bottom: 0,
                        height: "100%",
                        top: "4px",
                        left: 0,
                        position: "absolute",
                        width: "auto",
                      }}
                    />
                  </NoSsr>
                </Box>
              </Box>
            </Grid>
            <Grid md={4} xs={12}>
              <Box
                sx={{
                  bgcolor: "var(--mui-palette-background-level1)",
                  border: "1px solid var(--mui-palette-divider)",
                  borderRadius: "20px",
                  overflow: "hidden",
                }}
              >
                <Stack spacing={2} sx={{ p: 4 }}>
                  <div>
                    <Chip
                      color="primary"
                      icon={<PaletteIcon />}
                      label="Esaily Configurable"
                      variant="soft"
                    />
                  </div>
                  <Typography variant="h5">
                    EduCourse is adaptable and customizable to your school&#39;s
                    unique needs.
                  </Typography>
                </Stack>
                <Box sx={{ height: "300px", position: "relative" }}>
                  <Box
                    component="img"
                    src="/assets/home-feature-3.svg"
                    sx={{
                      bottom: "-150px",
                      height: "450px",
                      right: 0,
                      position: "absolute",
                      width: "auto",
                    }}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid md={12} xs={12}>
              <Box
                sx={{
                  bgcolor: "var(--mui-palette-background-level1)",
                  border: "1px solid var(--mui-palette-divider)",
                  borderRadius: "20px",
                  overflow: "hidden",
                }}
              >
                <Stack spacing={2} sx={{ p: 4 }}>
                  <div>
                    <Chip
                      color="primary"
                      icon={<CodeBlockIcon />}
                      label="Quality first"
                      variant="soft"
                    />
                  </div>
                  <Typography variant="h5">Built by experts</Typography>
                  <Typography color="text.secondary" variant="body2">
                    Each of our tool meets industry standards for security,
                    performance, and design.
                  </Typography>
                </Stack>
                <Box sx={{ height: "300px", position: "relative" }}>
                  <NoSsr>
                    <Box
                      component="img"
                      src={
                        colorScheme === "dark"
                          ? "/assets/home-feature-1-dark.png"
                          : "/assets/home-feature-1-light.png"
                      }
                      sx={{
                        bottom: 0,
                        height: "100%",
                        position: "absolute",
                        left: 0,
                        width: "auto",
                      }}
                    />
                  </NoSsr>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </div>
  );
}
