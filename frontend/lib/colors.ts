export const COLORS = {
  // Base
  background: "#181825",
  foreground: "#cdd6f4",

  // Brand
  primary: "#cba6f7",
  primaryForeground: "#1e1e2e",

  secondary: "#585b70",
  secondaryForeground: "#cdd6f4",

  accent: "#89dceb",
  accentForeground: "#1e1e2e",

  // Surfaces
  card: "#1e1e2e",
  cardForeground: "#cdd6f4",

  popover: "#45475a",
  popoverForeground: "#cdd6f4",

  muted: "#292c3c",
  mutedForeground: "#a6adc8",

  // Forms / borders
  border: "#313244",
  input: "#313244",
  ring: "#cba6f7",

  // Status
  destructive: "#f38ba8",
  destructiveForeground: "#1e1e2e",

  // Charts
  chart1: "#cba6f7",
  chart2: "#89dceb",
  chart3: "#a6e3a1",
  chart4: "#fab387",
  chart5: "#f5e0dc",

  // Sidebar
  sidebarBackground: "#11111b",
  sidebarForeground: "#cdd6f4",
  sidebarPrimary: "#cba6f7",
  sidebarPrimaryForeground: "#1e1e2e",
  sidebarAccent: "#89dceb",
  sidebarAccentForeground: "#1e1e2e",
  sidebarBorder: "#45475a",
  sidebarRing: "#cba6f7",
} as const;

export type ColorKey = keyof typeof COLORS;
