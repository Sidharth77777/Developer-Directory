"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Avatar,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { COLORS } from "@/lib/colors";

interface DevTableViewProps {
  developers: any[];
}

const sliceText = (text: string, max = 80) =>
  text?.length > max ? text.slice(0, 20) + "..." : text || "";

export default function DevTableView({ developers }: DevTableViewProps) {
  const router = useRouter();

  return (
    <TableContainer
      component={Paper}
      sx={{
        bgcolor: COLORS.card,
        //borderRadius: 3,
        border: `1px solid ${COLORS.border}`,
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: COLORS.mutedForeground }}>Developer</TableCell>
            <TableCell sx={{ color: COLORS.mutedForeground }}>Role</TableCell>
            <TableCell sx={{ color: COLORS.mutedForeground }}>Experience</TableCell>
            <TableCell sx={{ color: COLORS.mutedForeground }}>Tech stack</TableCell>
            <TableCell sx={{ color: COLORS.mutedForeground }}>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {developers.map((dev) => {
            const techText =
              typeof dev.techStack === "string"
                ? dev.techStack
                : Array.isArray(dev.techStack)
                ? dev.techStack.join(", ")
                : "";

            const photoSrc = dev.photoUrl || dev.photo || undefined;

            return (
              <TableRow
                key={dev._id || dev.id}
                onClick={() => router.push(`/dashboard/${dev._id || dev.id}`)}
                sx={{
                  transition: "all 0.25s ease",
                  "&:hover": {
                    outline: `1px solid ${COLORS.accent}`,
                    outlineOffset: "-2px",
                    bgcolor: COLORS.muted,
                    cursor: "pointer",
                    boxShadow: `0 0 6px ${COLORS.accent}`,
                  },
                }}
              >
                <TableCell>
                  <Box className="flex items-center gap-2">
                    <Avatar
                      src={photoSrc}
                      alt={dev.name}
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: COLORS.muted,
                        color: COLORS.accent,
                        fontSize: "0.9rem",
                        fontWeight: 600,
                      }}
                    >
                      {!photoSrc && dev.name ? dev.name[0]?.toUpperCase() : ""}
                    </Avatar>
                    <Box>
                      <Typography sx={{ color: COLORS.foreground, fontWeight: 500 }}>
                        {dev.name}
                      </Typography>
                      {dev.joiningDate && (
                        <Typography
                          variant="caption"
                          sx={{ color: COLORS.mutedForeground }}
                        >
                          Joined: {new Date(dev.joiningDate).toLocaleDateString()}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </TableCell>

                <TableCell sx={{ color: COLORS.foreground }}>{dev.role}</TableCell>

                <TableCell sx={{ color: COLORS.foreground }}>
                  {dev.experience} yrs
                </TableCell>

                <TableCell sx={{ color: COLORS.mutedForeground }}>
                  {sliceText(techText, 40)}
                </TableCell>

                <TableCell sx={{ color: COLORS.mutedForeground }}>
                  {sliceText(dev.description, 80)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
