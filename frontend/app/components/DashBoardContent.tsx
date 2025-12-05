"use client";

import { useState } from "react";
import DevForm from "../components/DevForm";
import DevList from "../components/DevList";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { COLORS } from "@/lib/colors";

export default function DashboardContent() {
  const [refetch, setRefetch] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);

  return (
    <>
      <div className="flex justify-center mt-6">
        <Button
          variant="contained"
          onClick={() => setShowForm(!showForm)}
          startIcon={showForm ? <CloseIcon /> : <AddIcon />}
          sx={{
            textTransform: "none",
            borderRadius: 999,
            px: 3,
            py: 1.1,
            fontWeight: 600,
            bgcolor: COLORS.primary,
            color: COLORS.primaryForeground,
            "&:hover": {
              bgcolor: COLORS.accent,
            },
          }}
        >
          {showForm ? "Close" : "Add New Developer"}
        </Button>
      </div>

      {showForm && <DevForm setRefetch={setRefetch} />}

      <DevList refetch={refetch} />
    </>
  );
}
