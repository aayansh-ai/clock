
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
    url: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2071&auto=format&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=320&auto=format&fit=crop",
    hint: "galaxy stars",
  },
  {
    name: "Forest",
    url: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2070&auto=format&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=320&auto=format&fit=crop",
    hint: "forest trees",
  },
  {
    name: "Beach",
    url: "https://images.unsplash.com/photo-1507525428034-b723a996f3d1?q=80&w=2070&auto=format&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1507525428034-b723a996f3d1?q=80&w=320&auto=format&fit=crop",
    hint: "beach ocean",
  },
  {
    name: "Mountain",
    url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=320&auto=format&fit=crop",
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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof e.target?.result === "string") {
          setCustomBackground(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const isNightMode = selectedTheme === "dark";

  const toggleNightMode = () => {
    setTheme(isNightMode ? "default" : "dark");
  };

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
         <div className="flex items-center justify-between rounded-lg border p-3">
          <Label htmlFor="night-mode">Night Mode</Label>
          <Switch
            id="night-mode"
            checked={isNightMode}
            onCheckedChange={toggleNightMode}
          />
        </div>
        <div className="space-y-2 rounded-lg border p-3">
            <Label htmlFor="background-upload">Upload Background</Label>
            <Input id="background-upload" type="file" accept="image/*" onChange={handleFileUpload} className="text-sm" />
        </div>
        <div className="space-y-2 rounded-lg border p-3">
          <Label htmlFor="custom-background">Custom Background URL</Label>
          <div className="flex gap-2">
            <Input
              id="custom-background"
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={customBackground.startsWith('data:') ? '' : customBackground}
              onChange={(e) => setCustomBackground(e.target.value)}
              className="text-sm"
            />
             <Button
                variant="ghost"
                size="sm"
                onClick={() => setCustomBackground("")}
              >
                Clear
              </Button>
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

    