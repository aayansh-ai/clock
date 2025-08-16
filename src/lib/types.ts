export type TimeFormat = "12h" | "24h";

export type Theme = {
  name: string;
  label: string;
  colors: {
    background: string;
    foreground: string;
    primary: string;
    "primary-foreground": string;
    secondary: string;
    "secondary-foreground": string;
    muted: string;
    "muted-foreground": string;
    accent: string;
    "accent-foreground": string;
    destructive: string;
    "destructive-foreground": string;
    border: string;
    input: string;
    ring: string;
  };
};
