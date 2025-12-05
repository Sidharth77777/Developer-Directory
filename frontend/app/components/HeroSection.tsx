import { COLORS } from "@/lib/colors"
import { Box, Button, Stack, Typography } from "@mui/material"
import NextLink from "next/link";

export default function HeroSection() {
    return (
        <Box sx={{ flex: 1 }}>
            {/* <Typography
              variant="overline"
              sx={{
                letterSpacing: 2,
                textTransform: "uppercase",
                color: COLORS.accent,
                fontWeight: 600,
              }}
            >
              Talrn Internship - Round 2
            </Typography> */}

            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 800,
                mt: 1,
                mb: 1.5,
                fontSize: { xs: "2.2rem", md: "2.9rem" },
              }}
            >
              Manage your{" "}
              <Box component="span" sx={{ color: COLORS.primary }}>
                developer
              </Box>{" "}
              talent in one place.
            </Typography>

            <Typography
              variant="body1"
              sx={{
                mb: 3,
                color: COLORS.mutedForeground,
                maxWidth: "32rem",
              }}
            >
              A secure developer directory with authentication, profiles,
              filtering, and rich UI — built using Next.js, Node, MongoDB, and
              Material UI on a modern dark theme.
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ mb: 2 }}
            >
              <Button
                component={NextLink}
                href="/signup"
                variant="contained"
                sx={{
                  px: 4,
                  py: 1.2,
                  fontWeight: 600,
                  textTransform: "none",
                  bgcolor: COLORS.primary,
                  color: COLORS.primaryForeground,
                  borderRadius: 999,
                  "&:hover": { bgcolor: "#b58def" },
                }}
              >
                Create an account
              </Button>

              <Button
                component={NextLink}
                href="/login"
                variant="outlined"
                sx={{
                  px: 4,
                  py: 1.2,
                  fontWeight: 500,
                  textTransform: "none",
                  borderRadius: 999,
                  borderColor: COLORS.border,
                  color: COLORS.foreground,
                  "&:hover": {
                    borderColor: COLORS.accent,
                    bgcolor: COLORS.muted,
                  },
                }}
              >
                Login to dashboard
              </Button>
            </Stack>

            <Typography
              variant="caption"
              sx={{ color: COLORS.mutedForeground }}
            >
              Already onboarded?{" "}
              <Box
                component={NextLink}
                href="/dashboard"
                sx={{
                  color: COLORS.accent,
                  fontWeight: 500,
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Go to dashboard
              </Box>
            </Typography>
          </Box>
    )
}