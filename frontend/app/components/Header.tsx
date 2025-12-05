"use client";

import { Box, Button, Typography, Stack } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonIcon from "@mui/icons-material/Person";
import { COLORS } from "@/lib/colors";
import Link from "next/link";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { AuthContext } from "../context/AuthContext";


export default function Header() {
    const { loggedIn, setLoggedIn, user, setUser } = useContext(AuthContext)!;
    const router: AppRouterInstance = useRouter();

    // useEffect(() => {
    //     if (typeof window === undefined) return;
    //     const token = localStorage.getItem("token");
    //     setLoggedIn(!!token);
    // },[]);

    const logout = async () => {
        if (typeof window === "undefined") return;

        localStorage.removeItem("token");
        localStorage.removeItem("email");
        document.cookie = "token=; path=/; max-age=0";

        setLoggedIn(false);
        setUser("");

        router.push("/login");
    }

    const storedEmail =
        typeof window !== "undefined" ? localStorage.getItem("email") : "";
    const displayEmail =
        storedEmail && storedEmail.length > 18
            ? storedEmail.slice(0, 18) + "…"
            : storedEmail;


    return (
        <Box
            sx={{
                width: "100%",
                px: { xs: 1, md: 3 },
                py: { xs: 1.5, md: 2 },
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                bgcolor: COLORS.sidebarBackground,
                borderBottom: `1px solid ${COLORS.sidebarBorder}`,
                gap: 1,
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    color: COLORS.sidebarPrimary,
                    fontWeight: 700,
                    fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
                }}
            >
                Dev Directory
            </Typography>

            {loggedIn ? (
                <Stack
                    direction="row"
                    spacing={{ xs: 1, sm: 2 }}
                    alignItems="center"
                    sx={{ flexShrink: 0 }}
                >
                    <Box
                        sx={{
                            px: 2,
                            py: 0.7,
                            bgcolor: COLORS.muted,
                            color: COLORS.sidebarForeground,
                            borderRadius: 999,
                            fontSize: { xs: "0.7rem", sm: "0.8rem" },
                            fontWeight: 600,
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            border: `1px solid ${COLORS.border}`,
                        }}
                    >
                        <PersonIcon
                            sx={{ fontSize: { xs: "1rem", sm: "1.2rem" }, color: COLORS.accent }}
                        />
                        {displayEmail || "User"}
                    </Box>

                    <Button
                        onClick={logout}
                        endIcon={<ExitToAppIcon />}
                        sx={{
                            textTransform: "none",
                            bgcolor: COLORS.destructive,
                            color: COLORS.destructiveForeground,
                            borderRadius: 2,
                            fontWeight: 600,
                            px: { xs: 1.8, sm: 2.5 },
                            py: { xs: 0.5, sm: 0.7 },
                            fontSize: { xs: "0.7rem", sm: "0.8rem" },
                            "&:hover": { opacity: 0.85 },
                            minWidth: "fit-content",
                        }}
                    >
                        Logout
                    </Button>
                </Stack>
            ) : (
                <Stack
                    direction="row"
                    spacing={{ xs: 1, sm: 2 }}
                    sx={{ flexShrink: 0 }}
                >
                    <Button
                        component={Link}
                        href="/login"
                        startIcon={<LoginIcon />}
                        sx={{
                            textTransform: "none",
                            borderRadius: 2,
                            fontWeight: 600,
                            px: { xs: 1.4, sm: 2.5 },
                            py: { xs: 0.4, sm: 0.7 },
                            fontSize: { xs: "0.7rem", sm: "0.8rem" },
                            border: `1px solid ${COLORS.sidebarBorder}`,
                            color: COLORS.sidebarForeground,
                            minWidth: "fit-content",
                            "&:hover": {
                                bgcolor: COLORS.muted,
                                borderColor: COLORS.accent,
                            },
                        }}
                    >
                        Login
                    </Button>

                    <Button
                        component={Link}
                        href="/signup"
                        startIcon={<PersonAddIcon />}
                        sx={{
                            textTransform: "none",
                            borderRadius: 2,
                            fontWeight: 600,
                            px: { xs: 1.6, sm: 3 },
                            py: { xs: 0.4, sm: 0.7 },
                            fontSize: { xs: "0.7rem", sm: "0.8rem" },
                            bgcolor: COLORS.primary,
                            color: COLORS.primaryForeground,
                            minWidth: "fit-content",
                            "&:hover": { bgcolor: "#b58def" },
                        }}
                    >
                        Sign up
                    </Button>
                </Stack>
            )}
        </Box>
    );
}
