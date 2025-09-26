"use client";

import type { CardProps } from "@mui/material/Card";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { useTheme, alpha } from "@mui/material/styles";
import { Chart, useChart } from "../chart";

type Props = CardProps & {
  title?: string;
  subheader?: string;
  chart: {
    colors?: string[];
    categories?: string[];
    series: { name: string; data: number[] }[];
  };
};

export function AvalesEstadosChart({
  title,
  subheader,
  chart,
  ...other
}: Props) {
  const theme = useTheme();

  const chartColors = chart.colors ?? [
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.error.main,
    alpha(theme.palette.primary.dark, 0.24),
  ];

  const chartOptions = useChart({
    colors: chartColors,
    stroke: { width: 2, colors: ["transparent"] },
    tooltip: {
      shared: true,
      intersect: false,
      y: { formatter: (value: number) => `${value} avales` },
    },
    xaxis: { categories: chart.categories },
    dataLabels: {
      enabled: true,
      offsetX: -6,
      style: {
        fontSize: "10px",
        colors: ["#FFFFFF", theme.palette.text.primary],
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 2,
        barHeight: "48%",
        dataLabels: { position: "top" },
      },
    },
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Chart
        type="bar"
        series={chart.series}
        options={chartOptions}
        height={360}
        sx={{ py: 2.5, pl: 1, pr: 2.5 }}
      />
    </Card>
  );
}
