"use client";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface MuiThemeProviderProps {
  children: React.ReactNode;
}

export function MuiThemeProvider({ children }: MuiThemeProviderProps) {
  const { theme: nextTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Evitar hidratación incorrecta
  if (!mounted) {
    return <>{children}</>;
  }

  const muiTheme = createTheme({
    palette: {
      mode: nextTheme === "dark" ? "dark" : "light",
      primary: {
        main: nextTheme === "dark" ? "#90caf9" : "#1976d2",
        light: nextTheme === "dark" ? "#bbdefb" : "#42a5f5",
        dark: nextTheme === "dark" ? "#42a5f5" : "#1565c0",
      },
      secondary: {
        main: nextTheme === "dark" ? "#f48fb1" : "#dc004e",
        light: nextTheme === "dark" ? "#ffc1e3" : "#ff5983",
        dark: nextTheme === "dark" ? "#ad1457" : "#9a0036",
      },
      warning: {
        main: nextTheme === "dark" ? "#ffb74d" : "#ed6c02",
        light: nextTheme === "dark" ? "#ffd54f" : "#ff9800",
        dark: nextTheme === "dark" ? "#f57c00" : "#e65100",
      },
      error: {
        main: nextTheme === "dark" ? "#f44336" : "#d32f2f",
        light: nextTheme === "dark" ? "#e57373" : "#ef5350",
        dark: nextTheme === "dark" ? "#d32f2f" : "#c62828",
      },
      success: {
        main: nextTheme === "dark" ? "#66bb6a" : "#2e7d32",
        light: nextTheme === "dark" ? "#81c784" : "#4caf50",
        dark: nextTheme === "dark" ? "#388e3c" : "#1b5e20",
      },
      info: {
        main: nextTheme === "dark" ? "#29b6f6" : "#0288d1",
        light: nextTheme === "dark" ? "#4fc3f7" : "#03a9f4",
        dark: nextTheme === "dark" ? "#0277bd" : "#01579b",
      },
      background: {
        default: nextTheme === "dark" ? "#0f172a" : "#ffffff",
        paper: nextTheme === "dark" ? "#1e293b" : "#ffffff",
      },
      text: {
        primary: nextTheme === "dark" ? "#f1f5f9" : "#0f172a",
        secondary: nextTheme === "dark" ? "#94a3b8" : "#64748b",
        disabled: nextTheme === "dark" ? "#64748b" : "#94a3b8",
      },
      divider: nextTheme === "dark" ? "#334155" : "#e2e8f0",
    },
    typography: {
      fontFamily: "Inter, system-ui, sans-serif",
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            backgroundColor: nextTheme === "dark" ? "#1e293b" : "#ffffff",
            borderColor: nextTheme === "dark" ? "#334155" : "#e2e8f0",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
