"use client";

import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import type { BoxProps } from "@mui/material/Box";

const StyledLegend = styled(Box)(({ theme }) => ({
  gap: 20,
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
}));

const StyledDot = styled(Box)(() => ({
  width: 12,
  height: 12,
  flexShrink: 0,
  borderRadius: "50%",
}));

type Props = BoxProps & {
  labels?: string[];
  colors?: string[];
};

export function ChartLegends({ labels, colors, sx, ...other }: Props) {
  return (
    <StyledLegend sx={sx} {...other}>
      {labels?.map((label, index) => (
        <Box key={label} sx={{ gap: 1, display: "flex", alignItems: "center" }}>
          <StyledDot sx={{ bgcolor: colors?.[index] }} />
          <Box component="span" sx={{ typography: "body2" }}>
            {label}
          </Box>
        </Box>
      ))}
    </StyledLegend>
  );
}
