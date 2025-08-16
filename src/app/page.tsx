
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
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme, isThemeLoaded } = useTheme();

  const [timeFormat, setTimeFormat] = useState<TimeFormat>("12h");
  const [showDate, setShowDate] = useState(true);
  const [keepScreenOn, setKeepScreenOn] = useState(false);
  const [customBackground, setCustomBackground] = useState("");

  const { isSupported } = useWakeLock(keepScreenOn);

  useEffect(() => {
    const storedFormat = localStorage.getItem(
      "chrono-timeFormat"
    ) as TimeFormat | null;
    const storedShowDate = localStorage.getItem("chrono-showDate");
    const storedKeepScreenOn = localStorage.getItem("chrono-keepScreenOn");
    const storedCustomBackground = localStorage.getItem("chrono-customBackground");

    if (storedFormat) setTimeFormat(storedFormat);
    if (storedShowDate) setShowDate(JSON.parse(storedShowDate));
    if (storedKeepScreenOn) setKeepScreenOn(JSON.parse(storedKeepScreenOn));
    if (storedCustomBackground) setCustomBackground(storedCustomBackground);

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

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("chrono-customBackground", customBackground);
    }
  }, [customBackground, isMounted]);

  if (!isMounted || !isThemeLoaded) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <main
      className="relative flex min-h-screen flex-col items-center justify-center bg-cover bg-center bg-background text-foreground transition-all duration-300"
      style={{
        backgroundImage: customBackground ? `url(${customBackground})` : "none",
      }}
    >
      {customBackground && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      )}
      <div className="relative z-10">
        <Clock timeFormat={timeFormat} showDate={showDate} />
      </div>

      <div className="absolute top-4 right-4 z-20 md:top-8 md:right-8">
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
          <SheetContent className="flex flex-col">
            <SheetHeader>
              <SheetTitle>Settings</SheetTitle>
            </SheetHeader>
            <ScrollArea className="flex-grow">
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
                customBackground={customBackground}
                setCustomBackground={setCustomBackground}
              />
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>

      <footer className="absolute bottom-4 z-10 px-4 text-center text-sm text-muted-foreground">
        <p>
          <strong>Coming Soon:</strong> Alarms, Stopwatch, and World Clocks.
        </p>
      </footer>
    </main>
  );
}
