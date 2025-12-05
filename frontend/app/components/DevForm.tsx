"use client";

import {
    TextField,
    Button,
    MenuItem,
    Snackbar,
    Alert,
    Paper,
    CircularProgress,
    Typography,
    Avatar,
    Box,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { api } from "@/config/axiosConfig";
import { useState, ChangeEvent } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import EditIcon from "@mui/icons-material/Edit";

import { DevFormProps, FormDataType } from "@/types/types";
import { techOptions } from "@/lib/techOptions";
import { COLORS } from "@/lib/colors";

export default function DevForm({ setRefetch }: DevFormProps) {
    const [techValues, setTechValues] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);

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
    } = useForm<FormDataType>();

    const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setPhotoFile(file);

        const previewUrl = URL.createObjectURL(file);
        setPhotoPreview(previewUrl);
    };

    const onSubmit = async (formValues: FormDataType) => {
    try {
        setLoading(true);

        const submitData = new FormData();

        submitData.append("name", formValues.name);
        submitData.append("role", formValues.role);
        submitData.append("experience", String(formValues.experience));
        submitData.append("description", formValues.description);
        submitData.append("joiningDate", formValues.joiningDate);
        submitData.append("techStack", formValues.techStack);

        if (photoFile) {
            submitData.append("photo", photoFile);
        }

        const res = await api.post("/developers", submitData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        if (res.data.success) {
            setAlert({
                open: true,
                message: res.data.message || "Developer Added Successfully!",
                severity: "success",
            });

            reset();
            setTechValues([]);
            setPhotoFile(null);
            setPhotoPreview(null);
            setRefetch(prev => !prev);
        }
    } catch (error: any) {
        setAlert({
            open: true,
            message: error?.response?.data?.message || "Something went wrong",
            severity: "error",
        });
    } finally {
        setLoading(false);
    }
};


    return (
        <Paper
            elevation={6}
            className="p-6 rounded-xl max-w-2xl sm:mx-auto mx-3 mt-10"
            sx={{
                bgcolor: COLORS.card,
                color: COLORS.cardForeground,
                borderRadius: 3,
                border: `1px solid ${COLORS.border}`,
            }}
        >
            <Typography
                variant="h5"
                align="center"
                sx={{ mb: 3, fontWeight: 600, color: COLORS.foreground }}
            >
                Add Developer
            </Typography>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                {/* Photo Upload */}
                <Box
                    className="md:col-span-2"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                    }}
                >
                    <Avatar
                        src={photoPreview ?? undefined}
                        alt="Developer photo"
                        sx={{
                            width: 56,
                            height: 56,
                            bgcolor: COLORS.muted,
                            color: COLORS.accent,
                            fontWeight: 600,
                            fontSize: "1rem",
                        }}
                    >
                        {!photoPreview ? "DP" : ""}
                    </Avatar>

                    <div className="flex flex-col gap-1">
                        <Button
                            variant="outlined"
                            component="label"
                            sx={{
                                textTransform: "none",
                                borderRadius: 999,
                                borderColor: COLORS.border,
                                color: COLORS.foreground,
                                display: "flex",
                                alignItems: "center",
                                gap: 1.2,
                                "&:hover": {
                                    borderColor: COLORS.accent,
                                    bgcolor: COLORS.muted,
                                },
                            }}
                        >
                            {photoFile ? (
                                <>
                                    <EditIcon sx={{ fontSize: 18 }} />
                                    Change Photo
                                </>
                            ) : (
                                <>
                                    <CloudUploadIcon sx={{ fontSize: 18 }} />
                                    Upload Photo
                                </>
                            )}

                            <input
                                hidden
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoChange}
                            />
                        </Button>

                        {photoFile && (
                            <Typography
                                variant="caption"
                                sx={{ color: COLORS.mutedForeground }}
                            >
                                Selected: {photoFile.name}
                            </Typography>
                        )}
                        <Typography
                            variant="caption"
                            sx={{ color: COLORS.mutedForeground }}
                        >
                            Photo is optional. You can upload a profile picture now or later.
                        </Typography>
                    </div>
                </Box>
                
                {/* Name */}
                <TextField
                    fullWidth
                    label="Developer Name"
                    {...register("name", { required: "Name is required" })}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    className="md:col-span-2"
                    InputLabelProps={{ sx: { color: COLORS.mutedForeground } }}
                    InputProps={{
                        sx: {
                            color: COLORS.foreground,
                            bgcolor: COLORS.input,
                            borderRadius: 2,
                        },
                    }}
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
                    InputLabelProps={{ sx: { color: COLORS.mutedForeground } }}
                    InputProps={{
                        sx: {
                            color: COLORS.foreground,
                            bgcolor: COLORS.input,
                            borderRadius: 2,
                        },
                    }}
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
                    InputLabelProps={{ sx: { color: COLORS.mutedForeground } }}
                    InputProps={{
                        sx: {
                            color: COLORS.foreground,
                            bgcolor: COLORS.input,
                            borderRadius: 2,
                        },
                    }}
                />

                {/* Joining Date */}
                <TextField
                    fullWidth
                    type="date"
                    label="Joining Date"
                    className="md:col-span-2"
                    {...register("joiningDate", {
                        required: "Joining date is required",
                    })}
                    error={!!errors.joiningDate}
                    helperText={errors.joiningDate?.message}
                    InputLabelProps={{
                        sx: { color: COLORS.mutedForeground },
                        shrink: true,
                    }}
                    InputProps={{
                        sx: {
                            color: COLORS.foreground,
                            bgcolor: COLORS.input,
                            borderRadius: 2,
                        },
                    }}
                />

                {/* Description */}
                <TextField
                    fullWidth
                    label="Description / About"
                    multiline
                    minRows={3}
                    {...register("description", {
                        required: "Description is required",
                        minLength: {
                            value: 10,
                            message: "Description should be at least 10 characters",
                        },
                    })}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    className="md:col-span-2"
                    InputLabelProps={{ sx: { color: COLORS.mutedForeground } }}
                    InputProps={{
                        sx: {
                            color: COLORS.foreground,
                            bgcolor: COLORS.input,
                            borderRadius: 2,
                        },
                    }}
                />

                {/* Tech Stack */}
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
                            InputLabelProps={{ sx: { color: COLORS.mutedForeground } }}
                            InputProps={{
                                ...params.InputProps,
                                sx: {
                                    color: COLORS.foreground,
                                    bgcolor: COLORS.input,
                                    borderRadius: 2,
                                },
                            }}
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
                        loading ? <CircularProgress size={20} color="inherit" /> : undefined
                    }
                    sx={{
                        mt: 1,
                        py: 1.1,
                        fontWeight: 600,
                        textTransform: "none",
                        bgcolor: COLORS.primary,
                        color: COLORS.primaryForeground,
                        borderRadius: 999,
                        "&:hover": {
                            bgcolor: "#b58def",
                        },
                    }}
                >
                    {loading ? "Adding..." : "Add Developer"}
                </Button>
            </form>

            {/* Toast */}
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
