"use client";

import { Card, CardContent, Chip } from "@mui/material";

export default function DevCardsView({ developers }: any) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {developers.map((dev: any) => (
        <Card
          key={dev._id}
          sx={{
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: "0px 0px 10px rgba(0,0,0,0.4)",
            border: "1px solid rgba(255,255,255,0.08)",
            transition: "all 0.25s ease-in-out",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0px 4px 20px rgba(0,0,0,0.7)",
              borderColor: "rgba(255,255,255,0.25)",
            },
          }}
        >
          <CardContent>
            <h3 className="text-xl font-semibold">{dev.name}</h3>
            <p className="text-sm text-blue-400 font-medium mb-3">
              {dev.role}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {dev.techStack.map((tech: string, index: number) => (
                <Chip
                  key={index}
                  label={tech}
                  size="small"
                  sx={{
                    bgcolor: "rgba(255,255,255,0.12)",
                    color: "#fff",
                    fontSize: "0.75rem",
                  }}
                />
              ))}
            </div>

            <p className="text-xs opacity-70">
              Experience:{" "}
              <span className="font-semibold">{dev.experience}</span> years
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
