import Box from "@mui/material/Box";
import { COLORS } from "@/lib/colors";
import DashboardContent from "../components/DashBoardContent";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const cookiStore =  await cookies();
    const token = cookiStore.get("token")?.value;

    if (!token) {
        redirect("/login");
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: COLORS.background,
                color: COLORS.foreground,
                pb: 5,
                pt: 5,
            }}
        >
            <DashboardContent />
            
        </Box>
    );
}
