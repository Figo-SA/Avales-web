"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { MuiThemeProvider } from "@/components/mui-theme-provider";
import {
  AvalesWidgetSummary,
  AvalesTiposChart,
  AvalesMensualesChart,
  AvalesEstadosChart,
  AvalesDeportesChart,
} from "@/components/analytics";

export default function Dashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/signin");
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Verificando acceso...</p>
      </div>
    );
  }

  return (
    <MuiThemeProvider>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          📊 Dashboard de Avales Deportivos
        </Typography>

        {/* Widgets de Resumen */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "repeat(4, 1fr)",
            },
            gap: 3,
            mb: 4,
          }}
        >
          <AvalesWidgetSummary
            title="Avales Totales"
            percent={15.2}
            total={234}
            icon="📋"
            chart={{
              categories: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
              series: [22, 8, 35, 50, 82, 84],
            }}
          />

          <AvalesWidgetSummary
            title="Aprobados"
            percent={8.7}
            total={187}
            color="secondary"
            icon="✅"
            chart={{
              categories: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
              series: [18, 12, 28, 42, 65, 78],
            }}
          />

          <AvalesWidgetSummary
            title="Pendientes"
            percent={-2.1}
            total={32}
            color="warning"
            icon="⏳"
            chart={{
              categories: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
              series: [8, 5, 12, 18, 22, 25],
            }}
          />

          <AvalesWidgetSummary
            title="Rechazados"
            percent={1.3}
            total={15}
            color="error"
            icon="❌"
            chart={{
              categories: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
              series: [2, 1, 3, 5, 4, 6],
            }}
          />
        </Box>

        {/* Primera fila de gráficas */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1fr 2fr" },
            gap: 3,
            mb: 4,
          }}
        >
          <AvalesTiposChart
            title="Tipos de Avales"
            subheader="Distribución por tipo"
            chart={{
              series: [
                { label: "Técnico Participación", value: 95 },
                { label: "Técnico Competitivo", value: 78 },
                { label: "Administrativo", value: 45 },
                { label: "Financiero", value: 16 },
              ],
            }}
          />

          <AvalesMensualesChart
            title="Avales por Mes"
            subheader="Tendencia mensual (+25%) vs año anterior"
            chart={{
              categories: [
                "Ene",
                "Feb",
                "Mar",
                "Abr",
                "May",
                "Jun",
                "Jul",
                "Ago",
                "Sep",
              ],
              series: [
                { name: "2024", data: [23, 33, 22, 37, 47, 38, 27, 34, 45] },
                { name: "2023", data: [18, 28, 18, 32, 42, 33, 22, 29, 40] },
              ],
            }}
          />
        </Box>

        {/* Segunda fila de gráficas */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" },
            gap: 3,
          }}
        >
          <AvalesEstadosChart
            title="Estados de Avales"
            subheader="Por modalidad deportiva"
            chart={{
              categories: [
                "Fútbol",
                "Básquet",
                "Voleibol",
                "Atletismo",
                "Natación",
              ],
              series: [
                { name: "Aprobados", data: [44, 35, 28, 32, 18] },
                { name: "Pendientes", data: [12, 8, 15, 10, 7] },
                { name: "Rechazados", data: [3, 2, 4, 2, 1] },
              ],
            }}
          />

          <AvalesDeportesChart
            title="Categorías Deportivas"
            subheader="Distribución por deporte"
            chart={{
              categories: [
                "Fútbol",
                "Básquet",
                "Voleibol",
                "Atletismo",
                "Natación",
                "Tenis",
              ],
              series: [
                { name: "Juvenil", data: [80, 50, 30, 40, 60, 20] },
                { name: "Senior", data: [60, 70, 50, 65, 45, 35] },
                { name: "Master", data: [40, 30, 40, 50, 35, 45] },
              ],
            }}
          />
        </Box>
      </Container>
    </MuiThemeProvider>
  );
}
