"use client";

import { GitHub, X } from "@mui/icons-material";
import NextLink from "next/link";
import { Box, Typography, Stack, IconButton } from "@mui/material";
import { COLORS } from "@/lib/colors";

export default function Footer() {
	return (
		<Box
			component="footer"
			sx={{
				width: "100%",
				py: 3,
				borderTop: `1px solid ${COLORS.border}`,
				bgcolor: COLORS.sidebarBackground,
				color: COLORS.mutedForeground,
				textAlign: "center",
			}}
		>
			<Typography
				variant="body2"
				sx={{ fontSize: { xs: "0.75rem", sm: "0.85rem" }, opacity: 0.85 }}
			>
				© {new Date().getFullYear()} Developer Directory — Built by{" "}
				<Box component="span" sx={{ fontWeight: 600, color: COLORS.foreground }}>
					Sidharth K S
				</Box>
			</Typography>

			<Stack
				direction="row"
				spacing={2.5}
				justifyContent="center"
				sx={{ mt: 2 }}
			>
				<IconButton
					component={NextLink}
					href="https://github.com/Sidharth77777/Developer-Directory/blob/main/README.md"
					target="_blank"
					sx={{
						color: COLORS.accent,
						transition: "all 0.2s ease",
						"&:hover": {
							transform: "translateY(-3px)",
							color: COLORS.chart2,
						},
					}}
				>
					<GitHub fontSize="medium" />
				</IconButton>

				<IconButton
					component={NextLink}
					href="https://x.com/cryptoSid1564"
					target="_blank"
					sx={{
						color: COLORS.accent,
						transition: "all 0.2s ease",
						"&:hover": {
							transform: "translateY(-3px)",
							color: COLORS.chart2,
						},
					}}
				>
					<X fontSize="medium" />
				</IconButton>
			</Stack>
		</Box>
	);
}
