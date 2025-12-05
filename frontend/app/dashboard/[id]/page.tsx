"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "@/app/context/AuthContext";
import { api } from "@/config/axiosConfig";

import {
    Box,
    Paper,
    Typography,
    Avatar,
    Chip,
    Stack,
    Button,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { techOptions } from "@/lib/techOptions";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { COLORS } from "@/lib/colors";
import { Developer, DeveloperWithAuthor } from "@/types/types";

export default function DeveloperDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();

    const [developer, setDeveloper] = useState<DeveloperWithAuthor | null>(null);

    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);

    const [editOpen, setEditOpen] = useState(false);
    const [editValues, setEditValues] = useState<Partial<DeveloperWithAuthor> | null>(null);
    const [savingEdit, setSavingEdit] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    useEffect(() => {
        const fetchDev = async () => {
            try {
                setLoading(true);
                const res = await api.get(`/developers/${id}`);
                setDeveloper(res.data.data as DeveloperWithAuthor);
                console.log("Developer from API:", res.data.data);
            } catch (err) {
                console.error("Error fetching developer:", err);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchDev();
    }, [id]);

    const storedEmail =
        typeof window !== "undefined" ? localStorage.getItem("email") : null;

    const ownerEmail =
        developer?.createdByEmail ||
        developer?.createdBy?.email ||
        null;

    const isOwner =
        !!storedEmail &&
        !!ownerEmail &&
        ownerEmail.trim().toLowerCase() === storedEmail.trim().toLowerCase();

    const handleDelete = () => {
        setDeleteOpen(true);
    };

    const confirmDelete = async () => {
        if (!developer) return;

        try {
            setDeleting(true);
            await api.delete(`/developers/${developer._id}`);
            router.push("/dashboard");
        } catch (err) {
            console.error("Error deleting developer:", err);
            setDeleting(false);
        }
    };

    const handleEdit = () => {
        if (!developer) return;

        setEditValues({
            ...developer,
            techStack:
                typeof developer.techStack === "string"
                    ? developer.techStack
                    : (developer.techStack as any[])?.join(", "),
        });

        setEditOpen(true);
    };

    const handleEditChange = (field: keyof Developer, value: any) => {
        setEditValues((prev) => (prev ? { ...prev, [field]: value } : prev));
    };

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!developer || !editValues) return;

        try {
            setSavingEdit(true);

            const payload = {
                name: editValues.name,
                role: editValues.role,
                experience: Number(editValues.experience),
                description: editValues.description,
                joiningDate: editValues.joiningDate,
                techStack: editValues.techStack,
            };

            const res = await api.put(`/developers/${developer._id}`, payload);

            const updated =
                res.data.data || res.data.developer || res.data || payload;

            setDeveloper((prev) =>
                prev ? { ...prev, ...updated } : (updated as Developer)
            );

            setEditOpen(false);
        } catch (err) {
            console.error("Error updating developer:", err);
        } finally {
            setSavingEdit(false);
        }
    };


    if (loading) {
        return (
            <Box className="flex justify-center items-center h-[60vh]">
                <CircularProgress />
            </Box>
        );
    }

    if (!developer) {
        return (
            <div className="min-h-screen">
                <Box className="flex flex-col items-center mt-20">
                    <Typography sx={{ color: COLORS.mutedForeground }}>
                        Developer not found.
                    </Typography>
                    <Button
                        startIcon={<ArrowBackIcon />}
                        sx={{
                            mt: 2,
                            textTransform: "none",
                            borderRadius: 999,
                            bgcolor: COLORS.primary,
                            color: COLORS.primaryForeground,
                            "&:hover": { bgcolor: COLORS.accent },
                        }}
                        onClick={() => router.push("/dashboard")}
                    >
                        Back to list
                    </Button>
                </Box>
            </div>
        );
    }

    const techArray =
        typeof developer.techStack === "string"
            ? developer.techStack
                .split(",")
                .map((t: string) => t.trim())
                .filter(Boolean)
            : (developer.techStack as any) || [];

    const photoSrc = developer.photoUrl || developer.photo || undefined;

    return (
        <div className="min-h-screen">
            <Box className="max-w-3xl mx-auto mt-10 px-4">
                <Button
                    startIcon={<ArrowBackIcon />}
                    sx={{
                        mb: 3,
                        textTransform: "none",
                        borderRadius: 999,
                        bgcolor: COLORS.muted,
                        color: COLORS.foreground,
                        "&:hover": {
                            bgcolor: COLORS.secondary,
                        },
                    }}
                    onClick={() => router.back()}
                >
                    Back
                </Button>

                <Paper
                    elevation={6}
                    sx={{
                        p: 4,
                        borderRadius: 3,
                        bgcolor: COLORS.card,
                        border: `1px solid ${COLORS.border}`,
                        color: COLORS.cardForeground,
                    }}
                >
                    <Box className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                        <Avatar
                            src={photoSrc}
                            alt={developer.name}
                            sx={{
                                width: 72,
                                height: 72,
                                bgcolor: COLORS.muted,
                                color: COLORS.accent,
                                fontWeight: 700,
                                fontSize: "1.5rem",
                            }}
                        >
                            {!photoSrc ? developer.name?.[0] : ""}
                        </Avatar>

                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 700, color: COLORS.foreground }}>
                                {developer.name}
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ color: COLORS.mutedForeground, mt: 0.5 }}
                            >
                                {developer.role} • {developer.experience} years experience
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{ color: COLORS.mutedForeground, mt: 0.3, display: "block" }}
                            >
                                {isOwner ? "(You)" : `by ${developer.createdByEmail || "Unknown"}`}
                            </Typography>

                            {developer.joiningDate && (
                                <Typography
                                    variant="body2"
                                    sx={{ color: COLORS.mutedForeground, mt: 0.5 }}
                                >
                                    Joined on{" "}
                                    {new Date(developer.joiningDate).toLocaleDateString()}
                                </Typography>
                            )}
                        </Box>
                    </Box>

                    <Box sx={{ mt: 2 }}>
                        <Typography
                            variant="subtitle2"
                            sx={{ mb: 1, color: COLORS.mutedForeground }}
                        >
                            About
                        </Typography>
                        <Typography sx={{ color: COLORS.foreground, whiteSpace: "pre-wrap", wordBreak: "break-word", overflowWrap: "anywhere", }}>
                            {developer.description}
                        </Typography>
                    </Box>

                    <Box sx={{ mt: 3 }}>
                        <Typography
                            variant="subtitle2"
                            sx={{ mb: 1, color: COLORS.mutedForeground }}
                        >
                            Tech Stack
                        </Typography>
                        <Stack direction="row" flexWrap="wrap" gap={1}>
                            {techArray.length ? (
                                techArray.map((tech: string) => (
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
                                ))
                            ) : (
                                <Typography variant="body2" sx={{ color: COLORS.mutedForeground }}>
                                    No tech stack specified.
                                </Typography>
                            )}
                        </Stack>
                    </Box>

                    <Box
                        sx={{
                            mt: 4,
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 2,
                            justifyContent: "flex-end",
                        }}
                    >
                        {isOwner && (
                            <>
                                <Button
                                    startIcon={<EditIcon />}
                                    onClick={handleEdit}
                                    sx={{
                                        textTransform: "none",
                                        borderRadius: 999,
                                        px: 3,
                                        bgcolor: COLORS.secondary,
                                        color: COLORS.foreground,
                                        "&:hover": { bgcolor: COLORS.accent },
                                    }}
                                >
                                    Edit
                                </Button>

                                <Button
                                    startIcon={<DeleteIcon />}
                                    onClick={handleDelete}
                                    disabled={deleting}
                                    sx={{
                                        textTransform: "none",
                                        borderRadius: 999,
                                        px: 3,
                                        bgcolor: COLORS.destructive ?? "#ff4d4f",
                                        color: COLORS.primaryForeground,
                                        "&:hover": {
                                            bgcolor: COLORS.destructive ?? "#ff4d4f",
                                            opacity: 0.9,
                                        },
                                    }}
                                >
                                    {deleting ? "Deleting..." : "Delete"}
                                </Button>
                            </>
                        )}
                    </Box>



                    <Dialog
                        open={!!editOpen && !!editValues}
                        onClose={() => !savingEdit && setEditOpen(false)}
                        fullWidth
                        maxWidth="sm"
                        PaperProps={{
                            sx: {
                                bgcolor: COLORS.card,
                                color: COLORS.cardForeground,
                                borderRadius: 3,
                                border: `1px solid ${COLORS.border}`,
                            },
                        }}
                    >
                        <DialogTitle sx={{ color: COLORS.foreground, fontWeight: 600 }}>
                            Edit Developer
                        </DialogTitle>



                        <DialogContent dividers>
                            <Box
                                component="form"
                                onSubmit={handleEditSubmit}
                                className="flex flex-col gap-3 mt-2"
                            >

                                <TextField
                                    label="Name"
                                    fullWidth
                                    value={editValues?.name ?? ""}
                                    onChange={(e) => handleEditChange("name", e.target.value)}
                                    InputLabelProps={{ sx: { color: COLORS.mutedForeground } }}
                                    InputProps={{
                                        sx: {
                                            bgcolor: COLORS.input,
                                            color: COLORS.foreground,
                                            borderRadius: 2,
                                        },
                                    }}
                                    sx={{ mb: 2 }}
                                />

                                <TextField
                                    select
                                    label="Role"
                                    fullWidth
                                    value={editValues?.role ?? ""}
                                    onChange={(e) => handleEditChange("role", e.target.value)}
                                    InputLabelProps={{ sx: { color: COLORS.mutedForeground } }}
                                    InputProps={{
                                        sx: {
                                            bgcolor: COLORS.input,
                                            color: COLORS.foreground,
                                            borderRadius: 2,
                                        },
                                    }}
                                    sx={{ mb: 2 }}
                                >
                                    <MenuItem value="Frontend">Frontend</MenuItem>
                                    <MenuItem value="Backend">Backend</MenuItem>
                                    <MenuItem value="Full-Stack">Full-Stack</MenuItem>
                                </TextField>

                                <TextField
                                    type="number"
                                    label="Experience (years)"
                                    fullWidth
                                    value={editValues?.experience ?? 0}
                                    onChange={(e) =>
                                        handleEditChange("experience", Number(e.target.value))
                                    }
                                    InputLabelProps={{ sx: { color: COLORS.mutedForeground } }}
                                    InputProps={{
                                        sx: {
                                            bgcolor: COLORS.input,
                                            color: COLORS.foreground,
                                            borderRadius: 2,
                                        },
                                    }}
                                    sx={{ mb: 2 }}
                                />

                                <TextField
                                    type="date"
                                    label="Joining Date"
                                    fullWidth
                                    value={editValues?.joiningDate?.slice(0, 10) ?? ""}
                                    onChange={(e) => handleEditChange("joiningDate", e.target.value)}
                                    InputLabelProps={{
                                        sx: { color: COLORS.mutedForeground },
                                        shrink: true,
                                    }}
                                    InputProps={{
                                        sx: {
                                            bgcolor: COLORS.input,
                                            color: COLORS.foreground,
                                            borderRadius: 2,
                                        },
                                    }}
                                    sx={{ mb: 2 }}
                                />

                                <TextField
                                    label="Description"
                                    fullWidth
                                    multiline
                                    minRows={3}
                                    value={editValues?.description ?? ""}
                                    onChange={(e) => handleEditChange("description", e.target.value)}
                                    InputLabelProps={{ sx: { color: COLORS.mutedForeground } }}
                                    InputProps={{
                                        sx: {
                                            bgcolor: COLORS.input,
                                            color: COLORS.foreground,
                                            borderRadius: 2,
                                        },
                                    }}
                                    sx={{ mb: 2 }}
                                />

                                <Autocomplete
                                    multiple
                                    freeSolo
                                    options={techOptions}
                                    value={
                                        typeof editValues?.techStack === "string"
                                            ? editValues.techStack.split(",").map((t) => t.trim()).filter(Boolean)
                                            : []
                                    }
                                    onChange={(_, value) =>
                                        handleEditChange("techStack", value.join(", "))
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Tech Stack"
                                            fullWidth
                                            InputLabelProps={{ sx: { color: COLORS.mutedForeground } }}
                                            InputProps={{
                                                ...params.InputProps,
                                                sx: {
                                                    bgcolor: COLORS.input,
                                                    color: COLORS.foreground,
                                                    borderRadius: 2,
                                                },
                                            }}
                                        />
                                    )}
                                />

                            </Box>
                        </DialogContent>

                        <DialogActions sx={{ p: 2.5 }}>
                            <Button
                                onClick={() => setEditOpen(false)}
                                disabled={savingEdit}
                                sx={{
                                    textTransform: "none",
                                    borderRadius: 999,
                                    px: 2.5,
                                    bgcolor: COLORS.muted,
                                    color: COLORS.foreground,
                                    "&:hover": { bgcolor: COLORS.secondary },
                                }}
                            >
                                Cancel
                            </Button>

                            <Button
                                onClick={handleEditSubmit}
                                disabled={savingEdit}
                                sx={{
                                    textTransform: "none",
                                    borderRadius: 999,
                                    px: 3,
                                    bgcolor: COLORS.primary,
                                    color: COLORS.primaryForeground,
                                    "&:hover": { bgcolor: COLORS.accent },
                                }}
                            >
                                {savingEdit ? "Saving..." : "Save changes"}
                            </Button>
                        </DialogActions>
                    </Dialog>


                    <Dialog
                        open={deleteOpen}
                        onClose={() => !deleting && setDeleteOpen(false)}
                        fullWidth
                        maxWidth="xs"
                        PaperProps={{
                            sx: {
                                bgcolor: COLORS.card,
                                borderRadius: 3,
                                border: `1px solid ${COLORS.border}`,
                            },
                        }}
                    >
                        <DialogTitle sx={{ color: COLORS.destructive ?? "#ff4d4f", fontWeight: 700 }}>
                            Delete Developer?
                        </DialogTitle>

                        <DialogContent dividers>
                            <Typography sx={{ color: COLORS.mutedForeground }}>
                                Are you sure you want to delete{" "}
                                <span style={{ color: COLORS.accent }}>
                                    {developer?.name}
                                </span>
                                ? This action cannot be undone.
                            </Typography>
                        </DialogContent>

                        <DialogActions sx={{ p: 2 }}>
                            <Button
                                sx={{
                                    textTransform: "none",
                                    borderRadius: 999,
                                    px: 2.5,
                                    bgcolor: COLORS.muted,
                                    color: COLORS.foreground,
                                    "&:hover": { bgcolor: COLORS.secondary },
                                }}
                                disabled={deleting}
                                onClick={() => setDeleteOpen(false)}
                            >
                                Cancel
                            </Button>

                            <Button
                                startIcon={<DeleteIcon />}
                                sx={{
                                    textTransform: "none",
                                    borderRadius: 999,
                                    px: 3,
                                    bgcolor: COLORS.destructive ?? "#ff4d4f",
                                    color: COLORS.primaryForeground,
                                    "&:hover": {
                                        bgcolor: COLORS.destructive ?? "#ff4d4f",
                                        opacity: 0.9,
                                    },
                                }}
                                disabled={deleting}
                                onClick={confirmDelete}
                            >
                                {deleting ? "Deleting..." : "Delete"}
                            </Button>
                        </DialogActions>
                    </Dialog>

                </Paper>
            </Box>
        </div>
    );
}
