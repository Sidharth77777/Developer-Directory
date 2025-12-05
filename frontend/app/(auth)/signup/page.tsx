"use client";

import React, { useContext, useState } from "react";
import {
    Box,
    Button,
    Stack,
    TextField,
    Typography,
    Link as MuiLink,
    IconButton,
    InputAdornment,
    Snackbar,
    Alert,
    CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import NextLink from "next/link";
import { AuthLayout } from "@/app/components/AuthLayout";
import { COLORS } from "@/lib/colors";
import { api } from "@/config/axiosConfig";
import { AuthContext } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export default function SignupPage() {
    const { setLoggedIn, setUser } = useContext(AuthContext)!;
    const router: AppRouterInstance = useRouter();
    
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [submitting, setSubmitting] = useState<boolean>(false);

    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirm, setShowConfirm] = React.useState(false);

    const [alert, setAlert] = useState({
        open: false,
        message: "",
        severity: "success" as "success" | "error",
    });

    const signUp = async() => {
        if (password !== confirmPassword) {
            setAlert({
                open: true,
                message: "Passwords are not same !",
                severity: "error",
            });
            return;
        }

        setSubmitting(true)
        try{
            const res = await api.post("/auth/signup", { email, name, password });
            
            if (res.data.success) {
                const token = res.data.token;
                localStorage.setItem("token", token);

                document.cookie = `token=${token}; path=/; secure; samesite=strict`;

                setAlert({
                    open: true,
                    message: "SignUp Success",
                    severity: "success",
                });

                setLoggedIn(true);
                setUser(res.data?.user?.email);
                localStorage.setItem("email", res.data?.user?.email);

                router.push("/dashboard");
            }

        } catch (err:any) {
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
            title="Create your account"
            subtitle="Join the directory and showcase your developer profile"
        >
            <Box
                component="form"
                onSubmit={(e) => e.preventDefault()}
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
                <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    required
                    variant="outlined"
                    InputLabelProps={{ sx: { color: COLORS.mutedForeground } }}
                    InputProps={{
                        sx: { color: COLORS.foreground, bgcolor: COLORS.input, borderRadius: 2 },
                    }}
                />

                <TextField
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    required
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    helperText="Use at least 6 characters"
                    InputLabelProps={{ sx: { color: COLORS.mutedForeground } }}
                    FormHelperTextProps={{ sx: { color: COLORS.mutedForeground } }}
                    InputProps={{
                        sx: { color: COLORS.foreground, bgcolor: COLORS.input, borderRadius: 2 },
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
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

                <TextField
                    label="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    fullWidth
                    required
                    variant="outlined"
                    type={showConfirm ? "text" : "password"}
                    InputLabelProps={{ sx: { color: COLORS.mutedForeground } }}
                    InputProps={{
                        sx: { color: COLORS.foreground, bgcolor: COLORS.input, borderRadius: 2 },
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowConfirm(!showConfirm)} edge="end">
                                    {showConfirm ? (
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
                        textTransform: "none",
                        bgcolor: COLORS.primary,
                        color: COLORS.primaryForeground,
                        borderRadius: 999,
                        "&:hover": { bgcolor: "#b58def" },
                    }}
                    disabled={!name || !email || !password || !confirmPassword}
                    onClick={signUp}
                >
                    {submitting ? <CircularProgress size={22} sx={{ color: COLORS.primaryForeground }} /> : "Sign Up"}
                </Button>

                <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
                    <Typography
                        variant="body2"
                        sx={{ color: COLORS.mutedForeground, mr: 0.5 }}
                    >
                        Already have an account?
                    </Typography>
                    <MuiLink
                        component={NextLink}
                        href="/login"
                        underline="hover"
                        sx={{ color: COLORS.accent, fontWeight: 500, fontSize: 14 }}
                    >
                        Login
                    </MuiLink>
                </Stack>
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
