"use client";

import {Table,TableHead,TableRow,TableCell,TableBody,Paper,Chip,TableContainer} from "@mui/material";

export default function DevTableView({ developers }: any) {
  return (
    <TableContainer
      component={Paper}
      sx={{
        bgcolor: "background.paper",
        overflowX: "auto",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Table sx={{ minWidth: 650 }}>
        {/* Table Head */}
        <TableHead>
          <TableRow
            sx={{
              bgcolor: "rgba(255,255,255,0.08)",
              "& th": { fontWeight: "bold", color: "#fff" },
            }}
          >
            <TableCell>Name</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Tech Stack</TableCell>
            <TableCell align="center">Experience</TableCell>
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody>
          {developers.map((dev: any) => (
            <TableRow
              key={dev._id}
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.06)",
                  cursor: "pointer",
                },
              }}
            >
              <TableCell sx={{ fontWeight: 500 }}>{dev.name}</TableCell>
              <TableCell>{dev.role}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {dev.techStack.map((tech: string, i: number) => (
                    <Chip
                      key={i}
                      label={tech}
                      size="small"
                      sx={{
                        bgcolor: "rgba(255,255,255,0.1)",
                        color: "#fff",
                        fontSize: "0.75rem",
                      }}
                    />
                  ))}
                </div>
              </TableCell>
              <TableCell align="center">{dev.experience} yrs</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
