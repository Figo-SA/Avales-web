"use client";

import type { CardProps } from "@mui/material/Card";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { useTheme, alpha } from "@mui/material/styles";
import { Chart, useChart } from "../chart";

// Función para formatear números
const fShortenNumber = (number: number) => {
  if (number >= 1000000) return `${(number / 1000000).toFixed(1)}M`;
  if (number >= 1000) return `${(number / 1000).toFixed(1)}K`;
  return number.toString();
};

const fPercent = (number: number) => `${number}%`;

type Props = CardProps & {
  title: string;
  total: number;
  percent: number;
  color?: "primary" | "secondary" | "warning" | "error";
  icon: React.ReactNode;
  chart: {
    series: number[];
    categories: string[];
  };
};

export function AvalesWidgetSummary({
  icon,
  title,
  total,
  chart,
  percent,
  color = "primary",
  sx,
  ...other
}: Props) {
  const theme = useTheme();
  const chartColors = [theme.palette[color].dark];

  const chartOptions = useChart({
    chart: { sparkline: { enabled: true } },
    colors: chartColors,
    xaxis: { categories: chart.categories },
    grid: { padding: { top: 6, left: 6, right: 6, bottom: 6 } },
    tooltip: {
      y: { formatter: (value: number) => value.toString() },
    },
  });

  return (
    <Card
      sx={{
        p: 3,
        boxShadow: "none",
        position: "relative",
        color: `${color}.darker`,
        backgroundColor: alpha(theme.palette[color].light, 0.1),
        ...sx,
      }}
      {...other}
    >
      <Box sx={{ width: 48, height: 48, mb: 3 }}>{icon}</Box>

      <Box
        sx={{
          top: 16,
          gap: 0.5,
          right: 16,
          display: "flex",
          position: "absolute",
          alignItems: "center",
        }}
      >
        <Box component="span" sx={{ typography: "subtitle2" }}>
          {percent > 0 && "+"}
          {fPercent(percent)}
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-end",
          justifyContent: "flex-end",
        }}
      >
        <Box sx={{ flexGrow: 1, minWidth: 112 }}>
          <Box sx={{ mb: 1, typography: "subtitle2" }}>{title}</Box>
          <Box sx={{ typography: "h4" }}>{fShortenNumber(total)}</Box>
        </Box>

        <Chart
          type="line"
          series={[{ data: chart.series }]}
          options={chartOptions}
          width={84}
          height={56}
        />
      </Box>
    </Card>
  );
}
