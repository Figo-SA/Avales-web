"use client";

import type { BoxProps } from "@mui/material/Box";
import dynamic from "next/dynamic";
import Box from "@mui/material/Box";

export interface ChartProps {
  type: "line" | "area" | "bar" | "pie" | "donut" | "radar";
  series: any[];
  options?: any;
  width?: string | number;
  height?: string | number;
  loadingProps?: any;
}

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export function Chart({
  sx,
  type,
  series,
  height,
  options,
  width = "100%",
  ...other
}: BoxProps & ChartProps) {
  return (
    <Box
      dir="ltr"
      sx={{
        width,
        height,
        flexShrink: 0,
        borderRadius: 1.5,
        position: "relative",
        ...sx,
      }}
      {...other}
    >
      <ApexChart
        type={type}
        series={series}
        options={options}
        width="100%"
        height="100%"
      />
    </Box>
  );
}
