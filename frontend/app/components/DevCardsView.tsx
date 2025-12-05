"use client";

import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Typography,
  Chip,
  Box,
  Stack,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { COLORS } from "@/lib/colors";

interface DevCardsViewProps {
  developers: any[];
}

const sliceText = (text: string, max = 110) =>
  text?.length > max ? text?.slice(0, max) + "..." : text || "";

export default function DevCardsView({ developers }: DevCardsViewProps) {
  const router = useRouter();

  return (
    <Box className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {developers.map((dev) => {
        const techArray =
          typeof dev.techStack === "string"
            ? dev.techStack
                .split(",")
                .map((t: string) => t.trim())
                .filter(Boolean)
            : dev.techStack || [];

        const photoSrc = dev.photoUrl || dev.photo || undefined;

        return (
          <Card
            key={dev._id || dev.id}
            onClick={() => router.push(`/dashboard/${dev._id || dev.id}`)}
            sx={{
              bgcolor: COLORS.card,
              color: COLORS.cardForeground,
              borderRadius: 3,
              border: `1px solid ${COLORS.border}`,
              transition: "all 0.25s ease",
              cursor: "pointer",
              "&:hover": {
                borderColor: COLORS.accent,
                boxShadow: `0 0 10px ${COLORS.accent}`,
              },
            }}
          >
            <CardHeader
              avatar={
                <Avatar
                  src={photoSrc}
                  alt={dev.name}
                  sx={{
                    bgcolor: COLORS.muted,
                    color: COLORS.accent,
                    fontWeight: 700,
                  }}
                >
                  {!photoSrc ? dev.name?.[0] : ""}
                </Avatar>
              }
              title={
                <Typography sx={{ fontWeight: 600, color: COLORS.foreground }}>
                  {dev.name}
                </Typography>
              }
              subheader={
                <Typography
                  variant="body2"
                  sx={{ color: COLORS.mutedForeground }}
                >
                  {dev.role} • {dev.experience} yrs exp
                </Typography>
              }
            />

            <CardContent>
              <Typography
                variant="body2"
                sx={{ mb: 1.5, color: COLORS.mutedForeground }}
              >
                {sliceText(dev.description, 30)}
              </Typography>

              <Stack direction="row" flexWrap="wrap" gap={1}>
                {techArray.slice(0, 4).map((tech: string) => (
                  <Chip
                    key={tech}
                    label={tech}
                    size="small"
                    sx={{
                      bgcolor: COLORS.muted,
                      color: COLORS.foreground,
                      borderRadius: 999,
                    }}
                  />
                ))}

                {techArray.length > 4 && (
                  <Typography
                    variant="caption"
                    sx={{ color: COLORS.mutedForeground }}
                  >
                    +{techArray.length - 4} more
                  </Typography>
                )}
              </Stack>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
}
