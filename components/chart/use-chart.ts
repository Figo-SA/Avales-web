"use client";

import { useTheme } from "@mui/material/styles";

export function useChart(options?: any): any {
  const theme = useTheme();

  return {
    ...options,
    chart: {
      toolbar: { show: false },
      zoom: { enabled: false },
      parentHeightOffset: 0,
      fontFamily: theme.typography.fontFamily,
      foreColor: theme.palette.text.disabled,
      ...options?.chart,
      animations: {
        enabled: true,
        speed: 360,
        animateGradually: { enabled: true, delay: 120 },
        dynamicAnimation: { enabled: true, speed: 360 },
        ...options?.chart?.animations,
      },
    },
    colors: options?.colors ?? [
      theme.palette.primary.main,
      theme.palette.warning.main,
      theme.palette.info.main,
      theme.palette.error.main,
      theme.palette.success.main,
    ],
    states: {
      ...options?.states,
      hover: {
        ...options?.states?.hover,
        filter: { type: "darken", value: 0.88 },
      },
    },
    fill: {
      opacity: 1,
      gradient: {
        type: "vertical",
        shadeIntensity: 0,
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [0, 100],
      },
      ...options?.fill,
    },
    dataLabels: { enabled: false, ...options?.dataLabels },
    stroke: { width: 3, curve: "smooth", lineCap: "round", ...options?.stroke },
    grid: {
      strokeDashArray: 3,
      borderColor: theme.palette.divider,
      ...options?.grid,
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
      ...options?.xaxis,
    },
    yaxis: {
      tickAmount: 5,
      ...options?.yaxis,
    },
    tooltip: {
      theme: theme.palette.mode,
      ...options?.tooltip,
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      ...options?.legend,
    },
  };
}
