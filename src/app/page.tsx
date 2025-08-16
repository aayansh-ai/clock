"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/hooks/use-theme";
import { useWakeLock } from "@/hooks/use-wake-lock";
import Clock from "@/components/clock";
import SettingsPanel from "@/components/settings-panel";
import type { TimeFormat } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Settings, Loader2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme, isThemeLoaded } = useTheme();

  const [timeFormat, setTimeFormat] = useState<TimeFormat>("12h");
  const [showDate, setShowDate] = useState(true);
  const [keepScreenOn, setKeepScreenOn] = useState(false);

  const { isSupported } = useWakeLock(keepScreenOn);

  useEffect(() => {
    const storedFormat = localStorage.getItem(
      "chrono-timeFormat"
    ) as TimeFormat | null;
    const storedShowDate = localStorage.getItem("chrono-showDate");
    const storedKeepScreenOn = localStorage.getItem("chrono-keepScreenOn");

    if (storedFormat) setTimeFormat(storedFormat);
    if (storedShowDate) setShowDate(JSON.parse(storedShowDate));
    if (storedKeepScreenOn) setKeepScreenOn(JSON.parse(storedKeepScreenOn));

    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("chrono-timeFormat", timeFormat);
    }
  }, [timeFormat, isMounted]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("chrono-showDate", JSON.stringify(showDate));
    }
  }, [showDate, isMounted]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("chrono-keepScreenOn", JSON.stringify(keepScreenOn));
    }
  }, [keepScreenOn, isMounted]);

  if (!isMounted || !isThemeLoaded) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-background text-foreground transition-colors duration-300">
      <Clock timeFormat={timeFormat} showDate={showDate} />

      <div className="absolute top-4 right-4 md:top-8 md:right-8">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-full hover:bg-accent/80"
              aria-label="Open settings"
            >
              <Settings className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Settings</SheetTitle>
            </SheetHeader>
            <SettingsPanel
              timeFormat={timeFormat}
              setTimeFormat={setTimeFormat}
              showDate={showDate}
              setShowDate={setShowDate}
              selectedTheme={theme}
              setTheme={setTheme}
              keepScreenOn={keepScreenOn}
              setKeepScreenOn={setKeepScreenOn}
              isWakeLockSupported={isSupported}
            />
          </SheetContent>
        </Sheet>
      </div>

      <footer className="absolute bottom-4 px-4 text-center text-sm text-muted-foreground">
        <p>
          <strong>Coming Soon:</strong> Alarms, Stopwatch, World Clocks, and
          Custom Backgrounds.
        </p>
      </footer>
    </main>
  );
}
