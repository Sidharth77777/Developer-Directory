"use client";

import { Box } from "@mui/material";
import { COLORS } from "@/lib/colors";
import HeroSection from "./components/HeroSection";
import FeatureCard from "./components/FeatureCard";

export default function HomePage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: COLORS.background,
        color: COLORS.foreground,
        display: "flex",
        flexDirection: "column",
      }}
    >

      <Box
        sx={{
          flex: 1,
          px: { xs: 3, md: 6 },
          py: { xs: 6, md: 10 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "1120px",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 5, md: 8 },
            alignItems: { xs: "center", md: "center" },
            justifyContent: "center",
          }}
        >
          {/* Left side - hero text */}
          
          <HeroSection />

          {/* Right side - feature card / stack overview */}

          <FeatureCard />

        </Box>
      </Box>
    </Box>
  );
}
