import { COLORS } from "@/lib/colors";
import { Box, Chip, Divider, List, ListItem, ListItemIcon, ListItemText, Paper, Stack, Typography } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import PeopleIcon from "@mui/icons-material/People";
import TuneIcon from "@mui/icons-material/Tune";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export default function FeatureCard() {
    return (
        <Paper
            elevation={10}
            sx={{
              flex: 1,
              bgcolor: COLORS.card,
              borderRadius: 4,
              border: `1px solid ${COLORS.border}`,
              p: 3,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(circle at top, rgba(203,166,247,0.18), transparent 55%)",
                pointerEvents: "none",
              }}
            />

            <Typography
              variant="subtitle2"
              sx={{
                mb: 1,
                color: COLORS.mutedForeground,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              What this app offers
            </Typography>

            <Typography
              variant="h6"
              sx={{ mb: 2, fontWeight: 700, color: COLORS.foreground }}
            >
              Built for a real-world dev workflow
            </Typography>

            <Stack
              direction="row"
              flexWrap="wrap"
              spacing={1}
              sx={{ mb: 2, rowGap: 1 }}
            >
              <Chip
                size="small"
                label="Next.js"
                sx={{
                  bgcolor: COLORS.muted,
                  color: COLORS.foreground,
                  fontSize: "0.75rem",
                }}
              />
              <Chip
                size="small"
                label="Node & Express"
                sx={{
                  bgcolor: COLORS.muted,
                  color: COLORS.foreground,
                  fontSize: "0.75rem",
                }}
              />
              <Chip
                size="small"
                label="MongoDB"
                sx={{
                  bgcolor: COLORS.muted,
                  color: COLORS.foreground,
                  fontSize: "0.75rem",
                }}
              />
              <Chip
                size="small"
                label="JWT Auth"
                sx={{
                  bgcolor: COLORS.muted,
                  color: COLORS.foreground,
                  fontSize: "0.75rem",
                }}
              />
              <Chip
                size="small"
                label="Material UI"
                sx={{
                  bgcolor: COLORS.muted,
                  color: COLORS.foreground,
                  fontSize: "0.75rem",
                }}
              />
            </Stack>

            <Divider
              sx={{ my: 2, borderColor: COLORS.border, opacity: 0.8 }}
            />

            <div className="flex justify-center items-center">
            <List dense disablePadding>
              <ListItem sx={{ px: 0, pb: 1 }}>
                <ListItemIcon sx={{ minWidth: 32, color: COLORS.chart1 }}>
                  <LockIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary="Secure authentication"
                  secondary="JWT-based login & signup with protected routes."
                  primaryTypographyProps={{ fontSize: 14, fontWeight: 600 }}
                  secondaryTypographyProps={{
                    fontSize: 12,
                    color: COLORS.mutedForeground,
                  }}
                />
              </ListItem>

              <ListItem sx={{ px: 0, pb: 1 }}>
                <ListItemIcon sx={{ minWidth: 32, color: COLORS.chart2 }}>
                  <PeopleIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary="Rich developer profiles"
                  secondary="Role, tech stack, experience, description, and more."
                  primaryTypographyProps={{ fontSize: 14, fontWeight: 600 }}
                  secondaryTypographyProps={{
                    fontSize: 12,
                    color: COLORS.mutedForeground,
                  }}
                />
              </ListItem>

              <ListItem sx={{ px: 0, pb: 1 }}>
                <ListItemIcon sx={{ minWidth: 32, color: COLORS.chart3 }}>
                  <TuneIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary="Search, filter & sort"
                  secondary="Filter by role, search by tech stack, and sort by experience."
                  primaryTypographyProps={{ fontSize: 14, fontWeight: 600 }}
                  secondaryTypographyProps={{
                    fontSize: 12,
                    color: COLORS.mutedForeground,
                  }}
                />
              </ListItem>

              <ListItem sx={{ px: 0 }}>
                <ListItemIcon sx={{ minWidth: 32, color: COLORS.chart4 }}>
                  <CheckCircleOutlineIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary="Production-ready UX"
                  secondary="Toasts, loading states, responsive layout, and clean dark UI."
                  primaryTypographyProps={{ fontSize: 14, fontWeight: 600 }}
                  secondaryTypographyProps={{
                    fontSize: 12,
                    color: COLORS.mutedForeground,
                  }}
                />
              </ListItem>
            </List>
            </div>

          </Paper>
    )
}