
"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { themes } from "@/lib/themes";
import type { TimeFormat } from "@/lib/types";
import { Check, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";

interface SettingsPanelProps {
  timeFormat: TimeFormat;
  setTimeFormat: (format: TimeFormat) => void;
  showDate: boolean;
  setShowDate: (show: boolean) => void;
  selectedTheme: string;
  setTheme: (theme: string) => void;
  keepScreenOn: boolean;
  setKeepScreenOn: (keepOn: boolean) => void;
  isWakeLockSupported: boolean;
  customBackground: string;
  setCustomBackground: (url: string) => void;
}

const predefinedBackgrounds = [
  {
    name: "Cosmic",
    url: "https://placehold.co/1920x1080.png",
    thumbnail: "https://placehold.co/320x180.png",
    hint: "galaxy stars",
  },
  {
    name: "Forest",
    url: "https://placehold.co/1920x1080.png",
    thumbnail: "https://placehold.co/320x180.png",
    hint: "forest trees",
  },
  {
    name: "Beach",
    url: "https://placehold.co/1920x1080.png",
    thumbnail: "https://placehold.co/320x180.png",
    hint: "beach ocean",
  },
  {
    name: "Mountain",
    url: "https://placehold.co/1920x1080.png",
    thumbnail: "https://placehold.co/320x180.png",
    hint: "mountain snow",
  },
];


export default function SettingsPanel({
  timeFormat,
  setTimeFormat,
  showDate,
  setShowDate,
  selectedTheme,
  setTheme,
  keepScreenOn,
  setKeepScreenOn,
  isWakeLockSupported,
  customBackground,
  setCustomBackground,
}: SettingsPanelProps) {
  return (
    <div className="space-y-8 p-1 pt-4">
      <div className="space-y-4 px-4">
        <h3 className="font-semibold text-foreground">Clock Settings</h3>
        <div className="flex items-center justify-between rounded-lg border p-3">
          <Label htmlFor="time-format">24-Hour Format</Label>
          <Switch
            id="time-format"
            checked={timeFormat === "24h"}
            onCheckedChange={(checked) =>
              setTimeFormat(checked ? "24h" : "12h")
            }
          />
        </div>
        <div className="flex items-center justify-between rounded-lg border p-3">
          <Label htmlFor="show-date">Show Date</Label>
          <Switch
            id="show-date"
            checked={showDate}
            onCheckedChange={setShowDate}
          />
        </div>
      </div>

      <div className="space-y-4 px-4">
        <h3 className="font-semibold text-foreground">Appearance</h3>
        <div className="space-y-2 rounded-lg border p-3">
          <Label htmlFor="custom-background">Custom Background URL</Label>
          <div className="flex gap-2">
            <Input
              id="custom-background"
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={customBackground}
              onChange={(e) => setCustomBackground(e.target.value)}
              className="text-sm"
            />
            {customBackground && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCustomBackground("")}
              >
                Clear
              </Button>
            )}
          </div>
        </div>
        <div className="space-y-2 rounded-lg border p-3">
          <Label>Predefined Backgrounds</Label>
          <div className="grid grid-cols-2 gap-2">
            {predefinedBackgrounds.map((bg) => (
              <button
                key={bg.name}
                onClick={() => setCustomBackground(bg.url)}
                className="group relative aspect-video w-full overflow-hidden rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <Image
                  src={bg.thumbnail}
                  alt={bg.name}
                  width={320}
                  height={180}
                  data-ai-hint={bg.hint}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30" />
                <span className="absolute bottom-1 left-2 text-xs font-semibold text-white">
                  {bg.name}
                </span>
              </button>
            ))}
          </div>
        </div>
        <Label>Theme</Label>
        <div className="grid grid-cols-2 gap-2">
          {themes.map((theme) => (
            <button
              key={theme.name}
              onClick={() => setTheme(theme.name)}
              className="group rounded-md border-2 p-2 text-left transition-all focus:outline-none focus:ring-2 focus:ring-ring"
              style={{
                borderColor:
                  theme.name === selectedTheme
                    ? `hsl(${theme.colors.primary})`
                    : "hsl(var(--border))",
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{theme.label}</span>
                {theme.name === selectedTheme && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </div>
              <div className="mt-2 flex gap-1 rounded-sm border p-1">
                <div
                  className="h-5 w-full rounded-sm"
                  style={{ backgroundColor: `hsl(${theme.colors.background})` }}
                />
                <div
                  className="h-5 w-full rounded-sm"
                  style={{ backgroundColor: `hsl(${theme.colors.foreground})` }}
                />
                <div
                  className="h-5 w-full rounded-sm"
                  style={{ backgroundColor: `hsl(${theme.colors.primary})` }}
                />
                <div
                  className="h-5 w-full rounded-sm"
                  style={{ backgroundColor: `hsl(${theme.colors.accent})` }}
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4 px-4">
        <h3 className="font-semibold text-foreground">Advanced</h3>
        <div className="flex items-center justify-between rounded-lg border p-3">
          <div className="flex items-center gap-2">
            <Label htmlFor="keep-screen-on">Keep Screen On</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Prevents your screen from sleeping.</p>
                  {!isWakeLockSupported && (
                    <p className="font-bold">
                      Not supported on this browser.
                    </p>
                  )}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Switch
            id="keep-screen-on"
            checked={keepScreenOn}
            onCheckedChange={setKeepScreenOn}
            disabled={!isWakeLockSupported}
          />
        </div>
      </div>
    </div>
  );
}
