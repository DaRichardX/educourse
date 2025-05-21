"use client";

import * as React from "react";
import RouterLink from "next/link";
import { usePathname } from "next/navigation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { CaretDown as CaretDownIcon } from "@phosphor-icons/react/dist/ssr/CaretDown";
import { List as ListIcon } from "@phosphor-icons/react/dist/ssr/List";

import { paths } from "@/paths";
import { isNavItemActive } from "@/lib/is-nav-item-active";
import { Dropdown } from "@/components/core/dropdown/dropdown";
import { DropdownPopover } from "@/components/core/dropdown/dropdown-popover";
import { DropdownTrigger } from "@/components/core/dropdown/dropdown-trigger";
import { Logo } from "@/components/core/logo";

import { MobileNav } from "./mobile-nav";
import { useEffect, useState } from "react";

export function MainNav() {
  const [openNav, setOpenNav] = React.useState(false);
  const pathname = usePathname();
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      const percentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setScrollY(scrollTop);
      setScrollPercentage(percentage);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const heroHeight =
      document.getElementById("hero-section")?.offsetHeight || 0;
    const passed = scrollY >= heroHeight - 85;

    setScrolledPastHero((prev) => (prev !== passed ? passed : prev));
  }, [scrollY]);

  return (
    <React.Fragment>
      <Box
        component="header"
        sx={{
          bgcolor: scrolledPastHero ? "black" : "transparent",
          color: scrolledPastHero ? "var(--mui-palette-common-white)" : "black",
          ml: "6px",
          width: "calc(100% - 12px)",
          position: "fixed",
          top: "6px",
          zIndex: "var(--MainNav-zIndex)",
          transition: "background-color 0.3s ease, color 0.3s ease",
          borderRadius: "25px",
        }}
      >
        <Container
          maxWidth={false}
          sx={{
            display: "flex",
            minHeight: "var(--MainNav-height)",
            py: "5px",
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            sx={{ alignItems: "center", flex: "1 1 auto" }}
          >
            <Box
              component={RouterLink}
              href={paths.home}
              sx={{ display: "inline-flex" }}
            >
              <Logo color="light" height={32} width={{ xs: 140, md: 180 }} />
            </Box>
            <Box component="nav" sx={{ display: { xs: "none", md: "block" } }}>
              <Stack
                component="ul"
                direction="row"
                spacing={1}
                sx={{ listStyle: "none", m: 0, p: 0 }}
              >
                <NavItem
                  scrolledPastHero={scrolledPastHero}
                  href={paths.components.index}
                  pathname={pathname}
                  title="Capstone Scheduling"
                />
                <NavItem
                  scrolledPastHero={scrolledPastHero}
                  href={paths.docs}
                  pathname={pathname}
                  title="Course Scheduling"
                />
              </Stack>
            </Box>
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              alignItems: "center",
              flex: "1 1 auto",
              justifyContent: "flex-end",
            }}
          >
            {/* <Box component="nav" sx={{ display: { xs: 'none', md: 'block' } }}>
              <Stack component="ul" direction="row" spacing={1} sx={{ listStyle: 'none', m: 0, p: 0 }}>
                <NavItem pathname={pathname} title="Pages">
                  <PagesPopover />
                </NavItem>
              </Stack>
            </Box> */}
            {scrolledPastHero && (
              <Button
                component={RouterLink}
                href={paths.dashboard.overview}
                sx={{
                  color: "var(--mui-palette-neutral-100)",
                  "&:hover": { opacity: 0.8 },
                  display: { xs: "none", md: "flex" },
                }}
              >
                Sign up
              </Button>
            )}

            <IconButton
              onClick={() => {
                setOpenNav(true);
              }}
              sx={{
                color: "var(--mui-palette-common-white)",
                display: { xs: "flex", md: "none" },
              }}
            >
              <ListIcon />
            </IconButton>
          </Stack>
        </Container>
      </Box>
      <MobileNav
        onClose={() => {
          setOpenNav(false);
        }}
        open={openNav}
      />
    </React.Fragment>
  );
}

export function NavItem({
  children,
  disabled,
  external,
  href,
  matcher,
  pathname,
  title,
  scrolledPastHero,
}) {
  const active = isNavItemActive({
    disabled,
    external,
    href,
    matcher,
    pathname,
  });
  const hasPopover = Boolean(children);

  const element = (
    <Box component="li" sx={{ userSelect: "none" }}>
      <Box
        {...(hasPopover
          ? {
              onClick: (event) => {
                event.preventDefault();
              },
              role: "button",
            }
          : {
              ...(href
                ? {
                    component: external ? "a" : RouterLink,
                    href,
                    target: external ? "_blank" : undefined,
                    rel: external ? "noreferrer" : undefined,
                  }
                : { role: "button" }),
            })}
        sx={{
          alignItems: "center",
          borderRadius: 1,
          color: "var(--mui-palette-neutral-100)",
          cursor: "pointer",
          display: "flex",
          flex: "0 0 auto",
          gap: 1,
          p: "6px 16px",
          textAlign: "left",
          textDecoration: "none",
          whiteSpace: "nowrap",
          ...(disabled && {
            bgcolor: "var(--mui-palette-action-disabledBackground)",
            color: "var(--mui-action-disabled)",
            cursor: "not-allowed",
          }),
          ...(active && { color: "var(--mui-palette-common-white)" }),
          "&:hover": {
            ...(!disabled &&
              !active && {
                bgcolor: "rgba(255, 255, 255, 0.1)",
              }),
          },
        }}
        tabIndex={0}
      >
        <Box component="span" sx={{ flex: "1 1 auto" }}>
          <Typography
            component="span"
            sx={{
              color: "inherit",
              fontSize: "0.875rem",
              fontWeight: 500,
              lineHeight: "28px",
            }}
          >
            {title}
          </Typography>
        </Box>
        {hasPopover ? (
          <Box
            sx={{
              alignItems: "center",
              color: "inherit",
              display: "flex",
              flex: "0 0 auto",
            }}
          >
            <CaretDownIcon fontSize="var(--icon-fontSize-sm)" />
          </Box>
        ) : null}
      </Box>
    </Box>
  );

  if (hasPopover) {
    return (
      <Dropdown>
        <DropdownTrigger>{element}</DropdownTrigger>
        <DropdownPopover
          PaperProps={{ sx: { width: "800px", maxWidth: "100%" } }}
          anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
          transformOrigin={{ horizontal: "center", vertical: "top" }}
        >
          {children}
        </DropdownPopover>
      </Dropdown>
    );
  }

  return element;
}
