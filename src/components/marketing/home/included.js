import * as React from "react";
import RouterLink from "next/link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";

import { paths } from "@/paths";

export function Included() {
  return (
    <Box
      sx={{
        bgcolor: "var(--mui-palette-neutral-950)",
        color: "var(--mui-palette-common-white)",
        overflow: "hidden",
        py: "120px",
        position: "relative",
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          left: 0,
          position: "absolute",
          top: 0,
          width: "100%",
          zIndex: 0,
        }}
      >
        <Box
          component="img"
          src="/assets/home-cosmic.svg"
          sx={{ height: "auto", width: "1600px" }}
        />
      </Box>
      <Stack spacing={8} sx={{ position: "relative", zIndex: 1 }}>
        <Container maxWidth="lg">
          <Grid alignItems="center" container spacing={3}>
            <Grid md={4} xs={12}>
              <Stack spacing={2}>
                <Typography color="inherit" variant="h3">
                  What can you expect
                </Typography>
                <Typography color="inherit" sx={{ padding: "20px 0" }}>
                  Educourse empowers educators to educate and counselors to
                  guide by eliminating the burden of bureaucracy.
                </Typography>
                <div>
                  <Button
                    color="primary"
                    component={RouterLink}
                    href={paths.dashboard.overview}
                    variant="contained"
                  >
                    Learn more
                  </Button>
                </div>
              </Stack>
            </Grid>
            <Grid md={8} xs={12}>
              <Box
                sx={{
                  margin: "0 auto",
                  maxWidth: "100%",
                  position: "relative",
                  width: "390px",
                }}
              >
                <Box
                  sx={{
                    bgcolor: "#8057f4",
                    bottom: 0,
                    filter: "blur(50px)",
                    height: "20px",
                    left: "15%",
                    position: "absolute",
                    right: 0,
                    top: 0,
                    transform: "rotate(-169deg)",
                    zIndex: 0,
                  }}
                />
                <Box
                  alt="Widgets"
                  component="img"
                  src="/assets/home-widgets.png"
                  sx={{
                    height: "auto",
                    position: "relative",
                    width: "100%",
                    zIndex: 1,
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Stack>
    </Box>
  );
}
