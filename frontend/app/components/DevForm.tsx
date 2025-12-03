"use client";

import { TextField, Button, MenuItem, Snackbar, Alert, Paper, CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
import { api } from "@/config/axiosConfig";
import { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";

import { DevFormProps, FormData } from "@/types/types";
import { techOptions } from "@/lib/techOptions";

export default function DevForm({ setRefetch }: DevFormProps) {
    const [techValues, setTechValues] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const [alert, setAlert] = useState({
        open: false,
        message: "",
        severity: "success" as "success" | "error",
    });

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        try {
            setLoading(true);

            const res = await api.post("/developers", data);

            if (res.data.success) {
                setAlert({
                    open: true,
                    message: res.data?.message || "Developer Added Successfully!",
                    severity: "success",
                });

                reset({
                    name: "",
                    role: "",
                    techStack: "",
                    experience: 0,
                });
                setTechValues([]);
                setRefetch((prev) => !prev);
            }
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || error?.message || "Internal Server Error !";
            setAlert({
                open: true,
                message: errorMessage,
                severity: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper
            elevation={6}
            className="p-6 rounded-xl max-w-xl sm:mx-auto mx-3 mt-10"
            sx={{ bgcolor: "background.paper" }}
        >
            <h2 className="text-2xl font-semibold mb-6 text-center">
                Add Developer
            </h2>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                {/* Full-width name */}
                <TextField
                    fullWidth
                    label="Developer Name"
                    {...register("name", { required: "Name is required" })}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    className="md:col-span-2"
                />

                {/* Role */}
                <TextField
                    fullWidth
                    select
                    label="Role"
                    defaultValue=""
                    {...register("role", { required: "Role is required" })}
                    error={!!errors.role}
                    helperText={errors.role?.message}
                >
                    <MenuItem value="Frontend">Frontend</MenuItem>
                    <MenuItem value="Backend">Backend</MenuItem>
                    <MenuItem value="Full-Stack">Full-Stack</MenuItem>
                </TextField>

                {/* Experience */}
                <TextField
                    fullWidth
                    type="number"
                    label="Experience (Years)"
                    {...register("experience", {
                        required: "Experience is required",
                        min: { value: 0, message: "Cannot be negative" },
                    })}
                    error={!!errors.experience}
                    helperText={errors.experience?.message}
                    inputProps={{ min: 0 }}
                />

                {/* Tech Stacks */}
                <Autocomplete
                    multiple
                    freeSolo
                    options={techOptions}
                    value={techValues}
                    onChange={(_, value) => {
                        setTechValues(value);
                        setValue("techStack", value.join(", "));
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Tech Stack"
                            placeholder="Select or type"
                            error={!!errors.techStack}
                            helperText={errors.techStack?.message}
                        />
                    )}
                    className="md:col-span-2"
                />

                {/* Submit Button */}
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    className="md:col-span-2"
                    disabled={loading}
                    startIcon={
                        loading ? (
                            <CircularProgress size={20} color="inherit" />
                        ) : undefined
                    }
                >
                    {loading ? "Adding..." : "Add Developer"}
                </Button>
            </form>

            {/* Alert */}
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
        </Paper>
    );
}
