"use client";

import { useContext, useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Link as MuiLink,
    IconButton,
    InputAdornment,
    CircularProgress,
    Snackbar,
    Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import NextLink from "next/link";
import { AuthLayout } from "@/app/components/AuthLayout";
import { COLORS } from "@/lib/colors";
import { api } from "@/config/axiosConfig";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { AuthContext } from "@/app/context/AuthContext";

export default function LoginPage() {
    const { setLoggedIn, setUser } = useContext(AuthContext)!;
    const router: AppRouterInstance = useRouter();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => setShowPassword((prev) => !prev);
    const [submitting, setSubmitting] = useState<boolean>(false);

    const [alert, setAlert] = useState({
        open: false,
        message: "",
        severity: "success" as "success" | "error",
    });

    const loginUser = async () => {
        setSubmitting(true);
        try {
            const res = await api.post("/auth/login", { email, password });

            if (res.data.success) {
                const token = res.data.token;
                localStorage.setItem("token", token);

                document.cookie = `token=${token}; path=/; secure; samesite=strict`;

                setAlert({
                    open: true,
                    message: "Login Success",
                    severity: "success",
                });

                setLoggedIn(true);
                setUser(res.data?.user?.email);
                localStorage.setItem("email", res.data?.user?.email);

                router.push("/dashboard");
            }

        } catch (err: any) {
            const errorMessage = err?.response?.data?.message || err?.message || "Internal Server Error !";
            setAlert({
                open: true,
                message: errorMessage,
                severity: "error",
            });

        } finally {
            setSubmitting(false);
        }
    }

    return (
        <AuthLayout
            title="Welcome back"
            subtitle="Login to access the Developer Directory"
        >
            <Box
                component="form"
                onSubmit={(e) => e.preventDefault()}
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    required
                    variant="outlined"
                    InputLabelProps={{ sx: { color: COLORS.mutedForeground } }}
                    InputProps={{
                        sx: { color: COLORS.foreground, bgcolor: COLORS.input, borderRadius: 2 },
                    }}
                />

                <TextField
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    variant="outlined"
                    InputLabelProps={{ sx: { color: COLORS.mutedForeground } }}
                    InputProps={{
                        sx: { color: COLORS.foreground, bgcolor: COLORS.input, borderRadius: 2 },
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={togglePassword} edge="end">
                                    {showPassword ? (
                                        <VisibilityOff sx={{ color: COLORS.mutedForeground }} />
                                    ) : (
                                        <Visibility sx={{ color: COLORS.mutedForeground }} />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                        mt: 1,
                        py: 1.2,
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textTransform: "none",
                        bgcolor: COLORS.primary,
                        color: COLORS.primaryForeground,
                        borderRadius: 999,
                        "&:hover": { bgcolor: "#b58def" },
                    }}
                    disabled={!email || !password}
                    onClick={loginUser}
                >
                    {submitting ? <CircularProgress size={22} sx={{ color: COLORS.primaryForeground }} /> : "Login"}
                </Button>

                <Typography
                    variant="body2"
                    align="center"
                    sx={{ mt: 2, color: COLORS.mutedForeground }}
                >
                    Don't have an account?{" "}
                    <MuiLink
                        component={NextLink}
                        href="/signup"
                        underline="hover"
                        sx={{ color: COLORS.accent, fontWeight: 500 }}
                    >
                        Sign up
                    </MuiLink>
                </Typography>
            </Box>

            <Snackbar
                open={alert.open}
                autoHideDuration={3000}
                onClose={() => setAlert({ ...alert, open: false })}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert
                    onClose={() => setAlert({ ...alert, open: false })}
                    severity={alert.severity}
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    {alert.message}
                </Alert>
            </Snackbar>

        </AuthLayout>
    );
}
