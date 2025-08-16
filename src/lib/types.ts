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

export type ClockType = "digital" | "analog";
export type DialShape = "round" | "square" | "oval";

export interface Birthday {
  name: string;
  month: number; // 0-11
  day: number;
}

export const birthdays: Birthday[] = [
  { name: 'Aayansh', month: 8, day: 18 }, // September 18
  { name: 'Papa', month: 3, day: 27 },     // April 27
  { name: 'Mummy', month: 9, day: 5 },  // October 5
];
