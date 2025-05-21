"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Hero() {
  const demoRef = useRef(null);
  const ctaRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonGroupRef = useRef(null);
  const strikeRef = useRef(null);
  const [loaded, setLoaded] = React.useState(false);
  const blurredRef = useRef(null);
  const fullResRef = useRef(null);

  React.useEffect(() => {
    const imgEl = fullResRef.current;
    if (!imgEl) return;

    if (imgEl.complete) {
      setLoaded(true);
    }
  }, []);

  React.useLayoutEffect(() => {
    if (!ctaRef.current || !demoRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero-section",
        start: "top top",
        end: "bottom +=40%",
        scrub: true,
        pin: ctaRef.current,
        pinSpacing: false,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    tl.to(
      demoRef.current,
      {
        scale: 1.2,
        ease: "none",
      },
      0,
    );

    tl.to(
      ctaRef.current,
      {
        scale: 0.8,
        autoAlpha: 0,
        ease: "none",
      },
      0,
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  React.useLayoutEffect(() => {
    if (!titleRef.current || !subtitleRef.current) return;

    const tl = gsap.timeline();

    tl.to(titleRef.current, {
      autoAlpha: 1,
      filter: "blur(0px)",
      duration: 1.5,
      ease: "power3.out",
    });

    tl.to(
      subtitleRef.current,
      {
        autoAlpha: 1,
        filter: "blur(0px)",
        duration: 1,
        ease: "power3.out",
      },
      "-=1",
    );

    tl.to(
      buttonGroupRef.current,
      {
        autoAlpha: 1,
        filter: "blur(0px)",
        duration: 1,
        ease: "power3.out",
      },
      "-=0.8",
    );

    tl.to(
      strikeRef.current,
      {
        "--strike-width": "100%",
        duration: 0.5,
        ease: "power2.out",
      },
      "+=0.2",
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <Box
      sx={{
        m: 2,
        mb: 0,
        borderRadius: 3,
        color: "var(--mui-palette-common-white)",
        overflow: "hidden",
        position: "relative",
        background:
          "linear-gradient(rgba(83, 123, 166, 0.99) 0%, rgba(154, 191, 218, 0.68) 58%, rgba(203, 223, 236, 0.3) 100%)",
      }}
      id="hero-section"
    >
      <Container
        maxWidth="md"
        sx={{
          position: "relative",
          py: { xs: "30px", sm: "40px", md: "60px" },
          mt: "85px",
          zIndex: 3,
          mb: "30px",
        }}
        ref={ctaRef}
      >
        <Stack spacing={4}>
          <Stack spacing={2}>
            <Typography
              ref={titleRef}
              sx={{
                fontSize: { xs: "2.7rem", sm: "3.8rem", md: "5.3rem" },
                fontWeight: 700,
                lineHeight: { xs: "3.1rem", sm: "3.9rem", md: "5.2rem" },
                textAlign: "center",
                opacity: 0,
                filter: "blur(30px)",
              }}
            >
              Students, not <br />
              <Typography
                component="span"
                ref={strikeRef}
                sx={{
                  fontSize: "inherit",
                  fontWeight: "inherit",
                  lineHeight: "inherit",
                  display: "inline-block",
                  position: "relative",
                  "::after": {
                    content: '""',
                    position: "absolute",
                    height: { xs: "6px", md: "10px" },
                    zIndex: 5,
                    backgroundColor: "currentColor",
                    left: 0,
                    bottom: "35%",
                    width: "var(--strike-width, 0%)",
                  },
                }}
              >
                paperwork
              </Typography>
            </Typography>
          </Stack>

          <Stack
            direction="row"
            spacing={1}
            sx={{
              alignItems: "center",
              justifyContent: "center ",
              py: { xs: "10px", md: "10px" },
              width: "100%",
            }}
          >
            <Typography
              color="white"
              ref={subtitleRef}
              sx={{
                maxWidth: "600px",
                fontSize: { xs: "0.9rem", sm: "1.1rem", md: "1.2rem" },
                fontWeight: 400,
                lineHeight: { xs: "1.1rem", sm: "1.3rem", md: "1.7rem" },
                textAlign: "center",
                opacity: 0,
                filter: "blur(30px)",
              }}
              variant="caption"
            >
              EduCourse is your trusted, turbo-charged course and capstone
              scheduling software.
            </Typography>
          </Stack>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            ref={buttonGroupRef}
            className="push-to-back"
            sx={{
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              zIndex: 9999,
              pointerEvents: "auto",
              opacity: 0,
              filter: "blur(30px)",
            }}
          >
            <Button
              href="/auth/sign-in"
              variant="contained"
              size="large"
              color="info"
              sx={{
                padding: "5px 24px",
                borderRadius: "28px",
                width: { xs: "80%", sm: "auto" },
                cursor: "pointer",
              }}
            >
              Sign in
            </Button>
            <Button
              href="/dashboard"
              sx={{
                color: "var(--mui-palette-common-black)",
                "&:hover": {
                  bgcolor: "var(--mui-palette-action-hover)",
                  borderWidth: "0.5px",
                },
                padding: "5px 24px",
                borderRadius: "28px",
                width: { xs: "80%", sm: "auto" },
                textAlign: "center",
                borderWidth: "0.5px",
                cursor: "pointer",
              }}
              size="large"
              variant="outlined"
              color="info"
            >
              Book a demo
            </Button>
          </Stack>
        </Stack>
      </Container>

      <Container
        maxWidth="lg"
        sx={{ position: "relative", zIndex: 200, pointerEvents: "none" }}
      >
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            zIndex: 9999,
          }}
        >
          <Box
            sx={{
              borderRadius: "20px",
              height: "100%",
              width: "100%",
            }}
          />
        </Box>

        <Box
          ref={demoRef}
          sx={{
            borderRadius: { xs: "10px", md: "20px" },
            bgcolor: "rgba( 255, 255, 255, 0.25)",
            backdropFilter: "blur( 10px )",
            padding: { xs: "0 8px", md: "0 12px" },
            paddingTop: { xs: "8px", md: "12px" },
            position: "relative",
            right: { xs: "-10%", md: "0" },
            width: { xs: "100%", md: "90%" },
            margin: "0 auto",
            pointerEvents: "none",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-48%, -50%)",
              width: "103%",
              height: "105%",
              background:
                "radial-gradient(141.53% 114.68% at 50% 50%, rgba(14, 114, 176, 0.8) 0%, rgba(14,10,162,0) 60%)",
              filter: "blur(20px)",
              borderRadius: "50px",
              boxShadow: "0px 5px 20px rgba(134, 203, 255, 0.3)",
              zIndex: 0,
              pointerEvents: "none",
            }}
          />
          <Box
            sx={{
              position: "relative",
              width: "100%",
              overflow: "hidden",
              borderRadius: { xs: "10px", md: "20px" },
            }}
          >
            <Box
              component="img"
              ref={blurredRef}
              src="/assets/home-hero-demo-light-blurred.png"
              sx={{
                width: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 1,
                filter: "blur(20px)",
                transform: "scale(1.05)",
                transition: "opacity 0.3s ease",
                opacity: loaded ? 0 : 1,
                overflow: "hidden",
                pointerEvents: "none",
              }}
            />
            <Box
              component="img"
              ref={fullResRef}
              src="/assets/home-hero-light.png"
              onLoad={() => setLoaded(true)}
              sx={{
                width: "100%",
                display: "block",
                zIndex: 20,
                opacity: loaded ? 1 : 0,
                transition: "opacity 0.4s ease-in-out",
                pointerEvents: "none",
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
