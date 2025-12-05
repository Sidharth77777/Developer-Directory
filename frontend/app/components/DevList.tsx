"use client";

import { useEffect, useState } from "react";
import { api } from "@/config/axiosConfig";
import {
  ToggleButton,
  ToggleButtonGroup,
  Pagination,
  CircularProgress,
  Paper,
  MenuItem,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import TableRowsIcon from "@mui/icons-material/TableRows";
import AppsIcon from "@mui/icons-material/Apps";
import DevCardsView from "./DevCardsView";
import DevTableView from "./DevTableView";
import { DevListProps } from "@/types/types";
import { COLORS } from "@/lib/colors";

export default function DevList({ refetch }: DevListProps) {
  const [developers, setDevelopers] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [loading, setLoading] = useState<boolean>(true);

  const [roleFilter, setRoleFilter] = useState<string>("All");
  const [searchFilter, setSearchFilter] = useState<string>("");

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [experienceSort, setExperienceSort] = useState<"" | "asc" | "desc">("");

  const fetchDevelopers = async (
    pageNum: number,
    role: string,
    search: string,
    sortExp: "" | "asc" | "desc",
  ): Promise<void> => {
    try {
      setLoading(true);

      const res = await api.get("/developers/q", {
        params: {
          page: pageNum,
          limit: 6,
          role: role !== "All" ? role : undefined,
          search: search || undefined,
          sortByExperience: sortExp || undefined,
        },
      });

      setDevelopers(res.data.data);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error("Error fetching developers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevelopers(page, roleFilter, searchFilter, experienceSort);
  }, [page, refetch, roleFilter, searchFilter, experienceSort]);

  const handlePageChange = (event: any, value: number) => {
    setPage(value);
  };

  return (
    <Box
      className="max-w-6xl xl:mx-auto mx-6 mt-12"
      sx={{ color: COLORS.foreground }}
    >
      <Box className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <Box>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, mb: 0.5, color: COLORS.foreground }}
          >
            Developers List
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: COLORS.mutedForeground }}
          >
            Filter by role, sort by experience, and search by name or tech stack
          </Typography>
        </Box>

        <Box className="flex flex-wrap gap-3 items-center">
          {/* Experience Sort */}
          <TextField
            select
            label="Experience"
            size="small"
            value={experienceSort}
            onChange={(e) => {
              setExperienceSort(e.target.value as "" | "asc" | "desc");
              setPage(1);
            }}
            sx={{
              minWidth: 170,
              "& .MuiOutlinedInput-root": {
                bgcolor: COLORS.input,
                color: COLORS.foreground,
                borderRadius: 2,
              },
              "& .MuiInputLabel-root": {
                color: COLORS.mutedForeground,
              },
            }}
          >
            <MenuItem value="">Default (Newest)</MenuItem>
            <MenuItem value="desc">High → Low</MenuItem>
            <MenuItem value="asc">Low → High</MenuItem>
          </TextField>

          {/* Role Filter */}
          <TextField
            select
            label="Role"
            size="small"
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value);
              setPage(1);
            }}
            sx={{
              minWidth: 140,
              "& .MuiOutlinedInput-root": {
                bgcolor: COLORS.input,
                color: COLORS.foreground,
                borderRadius: 2,
              },
              "& .MuiInputLabel-root": {
                color: COLORS.mutedForeground,
              },
            }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Frontend">Frontend</MenuItem>
            <MenuItem value="Backend">Backend</MenuItem>
            <MenuItem value="Full-Stack">Full-Stack</MenuItem>
          </TextField>

          {/* Search by name or tech */}
          <TextField
            label="Search"
            placeholder="Name or tech (e.g. React)"
            size="small"
            value={searchFilter}
            onChange={(e) => {
              setSearchFilter(e.target.value);
              setPage(1);
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                bgcolor: COLORS.input,
                color: COLORS.foreground,
                borderRadius: 2,
              },
              "& .MuiInputLabel-root": {
                color: COLORS.mutedForeground,
              },
            }}
          />

          {/* View Toggle */}
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={(_, val) => val && setViewMode(val)}
            sx={{
              bgcolor: COLORS.muted,
              borderRadius: 999,
              "& .MuiToggleButton-root": {
                color: COLORS.mutedForeground,
                border: "none",
                "&.Mui-selected": {
                  bgcolor: COLORS.primary,
                  color: COLORS.primaryForeground,
                },
                "&:hover": {
                  bgcolor: COLORS.secondary,
                },
              },
            }}
          >
            <ToggleButton value="cards">
              <AppsIcon />
            </ToggleButton>
            <ToggleButton value="table">
              <TableRowsIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>

      {loading ? (
        <Box className="flex justify-center items-center flex-col py-20">
          <CircularProgress />
          <Typography
            sx={{ mt: 2, textAlign: "center", color: COLORS.mutedForeground }}
          >
            Connecting to server... This may take a few seconds on free hosting.
          </Typography>
        </Box>
      ) : developers.length === 0 ? (
        <Paper
          className="text-center py-10"
          sx={{
            bgcolor: COLORS.card,
            color: COLORS.mutedForeground,
            borderRadius: 3,
            border: `1px solid ${COLORS.border}`,
          }}
        >
          No developers found
        </Paper>
      ) : viewMode === "cards" ? (
        <DevCardsView developers={developers} />
      ) : (
        <DevTableView developers={developers} />
      )}

      {/* Pagination */}
      <Box className="flex justify-center mt-10">
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
}
