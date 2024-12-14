"use client";

import * as React from "react";
import RouterLink from "next/link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { useColorScheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { paths } from "@/paths";

export function Hero() {
  const { colorScheme } = useColorScheme();

  const [img, setImg] = React.useState("/assets/home-hero-light.png");

  React.useEffect(() => {
    setImg(
      colorScheme === "dark"
        ? "/assets/home-hero-dark.png"
        : "/assets/home-hero-light.png",
    );
  }, [colorScheme]);

  return (
    <Box
      sx={{
        bgcolor: "var(--mui-palette-neutral-950)",
        color: "var(--mui-palette-common-white)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          bottom: 0,
          display: "flex",
          justifyContent: "center",
          left: 0,
          position: "absolute",
          right: 0,
          top: 0,
          zIndex: 0,
        }}
      >
        <Box
          component="img"
          src="/assets/home-cosmic.svg"
          sx={{ height: "auto", width: "1600px" }}
        />
      </Box>
      <Box
        sx={{
          alignItems: "center",
          bottom: 0,
          display: "flex",
          justifyContent: "center",
          left: 0,
          position: "absolute",
          right: 0,
          top: 0,
          zIndex: 1,
        }}
      >
        <Box
          component="img"
          src="/assets/home-rectangles.svg"
          sx={{ height: "auto", width: "1900px" }}
        />
      </Box>
      <Container
        maxWidth="md"
        sx={{
          position: "relative",
          py: { xs: "80px", sm: "100px", md: "120px" },
          zIndex: 3,
        }}
      >
        <Stack spacing={4}>
          <Stack spacing={2}>
            <Typography
              sx={{
                fontSize: { xs: "2.2rem", sm: "3rem", md: "3.5rem" },
                fontWeight: 600,
                lineHeight: { xs: "2.9rem", sm: "3.5rem", md: "4.1rem" },
                textAlign: "center",
              }}
            >
              EduCourse Simplifies your Administration Process <br />
              <Typography
                color="primary.main"
                component="span"
                variant="inherit"
              >
                One Step at a Time
              </Typography>
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
            <Button
              component={RouterLink}
              href={"not implemented"}
              variant="contained"
            >
              Contact Us
            </Button>
            <Button
              component={RouterLink}
              href={paths.dashboard.overview}
              sx={{
                color: "var(--mui-palette-common-white)",
                "&:hover": { bgcolor: "var(--mui-palette-action-hover)" },
              }}
            >
              Sign in
            </Button>
          </Stack>
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: "center",
            justifyContent: "center ",
            py: { xs: "20px", sm: "25px", md: "28px" },
            width: "100%",
            maxMidth: "250px",
          }}
        >
          <Typography
            color="neutral.300"
            sx={{ whiteSpace: "nowrap" }}
            variant="caption"
          >
            <Typography
              color="inherit"
              component="span"
              sx={{ fontWeight: 700, margin: "0 auto", width: "70%" }}
              variant="inherit"
            >
              Built for School Administrators
            </Typography>{" "}
            | Free, secure and highly efficent softwares.
          </Typography>
        </Stack>
      </Container>

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        <Box
          sx={{
            bottom: 0,
            left: 0,
            position: "absolute",
            px: "24px",
            right: 0,
            top: 0,
            zIndex: 0,
          }}
        >
          <Box
            sx={{
              bgcolor: "var(--mui-palette-neutral-950)",
              borderRadius: "28px",
              height: "100%",
              width: "100%",
            }}
          />
        </Box>
        <Box
          sx={{
            bgcolor: "#8057f4",
            filter: "blur(50px)",
            height: "30px",
            left: "50%",
            position: "absolute",
            top: 0,
            transform: "translateX(-50%)",
            width: "80%",
            zIndex: 1,
          }}
        />
        <Box
          component="img"
          src={img}
          sx={{
            display: "block",
            height: "auto",
            position: "relative",
            width: "100%",
            zIndex: 2,
          }}
        />
      </Container>
    </Box>
  );
}
