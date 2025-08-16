
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

export type ClockType = "digital" | "analog" | "retro";
export type DialShape = "round" | "square" | "oval";

export interface Birthday {
  name: string;
  month: number; // 0-11
  day: number;
  message?: string;
}

export const birthdays: Birthday[] = [
  { name: 'Aayansh', month: 8, day: 18, message: 'Happy Birthday Aayansh and Dadu' }, // September 18
  { name: 'Dadu', month: 8, day: 18, message: 'Happy Birthday Aayansh and Dadu' }, // September 18
  { name: 'Papa', month: 3, day: 27 },     // April 27
  { name: 'Mummy', month: 9, day: 5 },  // October 5
  { name: 'Grandmother', month: 4, day: 7 }, // May 7
  { name: 'Mamuni Apa', month: 10, day: 3 }, // November 3
  { name: 'Ansh Bhai', month: 6, day: 11 },  // July 11
  { name: 'Manas Piyusa', month: 7, day: 2 },// August 2
  { name: 'Aja', month: 1, day: 12 },      // February 12
  { name: 'Aaima', month: 6, day: 19 },      // July 19
];
