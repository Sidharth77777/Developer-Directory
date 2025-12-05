"use client";

import { ReactNode } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { COLORS } from "@/lib/colors";
import { AuthLayoutProps } from "@/types/types";

export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: COLORS.background,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: "100%",
          maxWidth: 440,
          bgcolor: COLORS.card,
          color: COLORS.cardForeground,
          borderRadius: 3,
          p: 4,
          border: `1px solid ${COLORS.border}`,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{ mb: 1.5, fontWeight: 700 }}
        >
          {title}
        </Typography>

        {subtitle && (
          <Typography
            variant="body2"
            sx={{ mb: 3, color: COLORS.mutedForeground }}
          >
            {subtitle}
          </Typography>
        )}

        {children}
      </Paper>
    </Box>
  );
}
