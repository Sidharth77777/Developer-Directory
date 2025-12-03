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
} from "@mui/material";
import TableRowsIcon from "@mui/icons-material/TableRows";
import AppsIcon from "@mui/icons-material/Apps";
import DevCardsView from "./DevCardsView";
import DevTableView from "./DevTableView";
import { DevListProps } from "@/types/types";

export default function DevList({ refetch }: DevListProps) {
  const [developers, setDevelopers] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [loading, setLoading] = useState<boolean>(true);

  const [roleFilter, setRoleFilter] = useState<string>("All");
  const [techFilter, setTechFilter] = useState<string>("");

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchDevelopers = async (
    pageNum: number,
    role: string,
    tech: string
  ): Promise<void> => {
    try {
      setLoading(true);

      const res = await api.get("/developers/q", {
        params: {
          page: pageNum,
          limit: 6,
          role: role !== "All" ? role : undefined,
          techStack: tech || undefined,
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
    fetchDevelopers(page, roleFilter, techFilter);
  }, [page, refetch, roleFilter, techFilter]);

  const handlePageChange = (event: any, value: number) => {
    setPage(value);
  };

  return (
    <div className="max-w-6xl xl:mx-auto mx-6 mt-12">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Developers List</h2>
          <p className="text-sm opacity-70">Filter by role or tech stack</p>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
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
            sx={{ minWidth: 140 }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Frontend">Frontend</MenuItem>
            <MenuItem value="Backend">Backend</MenuItem>
            <MenuItem value="Full-Stack">Full-Stack</MenuItem>
          </TextField>

          {/* Tech Stack Filter */}
          <TextField
            label="Tech stack"
            placeholder="e.g. React"
            size="small"
            value={techFilter}
            onChange={(e) => {
              setTechFilter(e.target.value);
              setPage(1);
            }}
          />

          {/* View Toggle */}
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={(_, val) => val && setViewMode(val)}
            sx={{ bgcolor: "background.paper" }}
          >
            <ToggleButton value="cards">
              <AppsIcon />
            </ToggleButton>
            <ToggleButton value="table">
              <TableRowsIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <CircularProgress />
        </div>
      ) : developers.length === 0 ? (
        <Paper className="text-center py-10">No developers found</Paper>
      ) : viewMode === "cards" ? (
        <DevCardsView developers={developers} />
      ) : (
        <DevTableView developers={developers} />
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-10">
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </div>
    </div>
  );
}
