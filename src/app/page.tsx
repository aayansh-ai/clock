
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "@/hooks/use-theme";
import { useWakeLock } from "@/hooks/use-wake-lock";
import Clock from "@/components/clock";
import AnalogClock from "@/components/analog-clock";
import MonthlyCalendar from "@/components/monthly-calendar";
import SettingsPanel from "@/components/settings-panel";
import type { TimeFormat, ClockType, DialShape } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Moon, Sun, Clock4, TabletSmartphone, Square, Circle, Ellipsis, Settings, CalendarIcon, Gift } from "lucide-react";
import { cn } from "@/lib/utils";
import BirthdayCelebration from "@/components/BirthdayCelebration";
import BirthdayListDialog from "@/components/BirthdayListDialog";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme, isThemeLoaded } = useTheme();

  const [timeFormat, setTimeFormat] = useState<TimeFormat>("12h");
  const [showDate, setShowDate] = useState(true);
  const [keepScreenOn, setKeepScreenOn] = useState(false);
  const [customBackground, setCustomBackground] = useState("https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2071&auto=format&fit=crop");
  const [clockType, setClockType] = useState<ClockType>("digital");
  const [dialShape, setDialShape] = useState<DialShape>("round");
  const [birthdayPerson, setBirthdayPerson] = useState<string | null>(null);
  const [showBirthdayList, setShowBirthdayList] = useState(false);


  const { isSupported } = useWakeLock(keepScreenOn);

  useEffect(() => {
    const storedFormat = localStorage.getItem(
      "chrono-timeFormat"
    ) as TimeFormat | null;
    const storedShowDate = localStorage.getItem("chrono-showDate");
    const storedKeepScreenOn = localStorage.getItem("chrono-keepScreenOn");
    const storedCustomBackground = localStorage.getItem("chrono-customBackground");
    const storedClockType = localStorage.getItem("chrono-clockType") as ClockType | null;
    const storedDialShape = localStorage.getItem("chrono-dialShape") as DialShape | null;


    if (storedFormat) setTimeFormat(storedFormat);
    if (storedShowDate) setShowDate(JSON.parse(storedShowDate));
    if (storedKeepScreenOn) setKeepScreenOn(JSON.parse(storedKeepScreenOn));
    if (storedCustomBackground) setCustomBackground(storedCustomBackground);
    if (storedClockType) setClockType(storedClockType);
    if (storedDialShape) setDialShape(storedDialShape);

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

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("chrono-clockType", clockType);
    }
  }, [clockType, isMounted]);

    useEffect(() => {
    if (isMounted) {
      localStorage.setItem("chrono-dialShape", dialShape);
    }
  }, [dialShape, isMounted]);

  if (!isMounted || !isThemeLoaded) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  const handleBirthdayClick = (name: string) => {
    setBirthdayPerson(name);
  };

  const getCelebrationMessage = () => {
    if (birthdayPerson === 'Aayansh') return "Happy Birthday Aayansh!!!";
    if (birthdayPerson) return `Happy Birthday ${birthdayPerson}`;
    return "";
  }

  return (
    <main
      className="group relative flex min-h-screen flex-col items-center justify-center bg-cover bg-center text-foreground transition-all duration-300"
      style={{
        backgroundImage: customBackground ? `url(${customBackground})` : "none",
        backgroundColor: `hsl(var(--background))`,
      }}
    >
      {birthdayPerson && (
        <BirthdayCelebration 
          message={getCelebrationMessage()} 
          onComplete={() => setBirthdayPerson(null)} 
        />
      )}
       <BirthdayListDialog open={showBirthdayList} onOpenChange={setShowBirthdayList} />
      <div
        className={cn("absolute inset-0 backdrop-blur-sm", {
          "bg-black/50": !!customBackground,
        })}
      />
      <div className="relative z-10 flex flex-col items-center gap-8">
        {clockType === 'digital' ? (
          <Clock timeFormat={timeFormat} showDate={showDate} />
        ) : (
          <AnalogClock shape={dialShape} />
        )}
        <div className={cn(
          "transition-all duration-500 ease-in-out",
          showDate ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}>
          {showDate && <MonthlyCalendar onBirthdayClick={handleBirthdayClick} />}
        </div>
      </div>


      <div className="absolute bottom-4 left-4 z-20" />


      <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
         <Button variant="ghost" size="icon" onClick={() => setClockType(clockType === 'digital' ? 'analog' : 'digital')} className="h-12 w-12 rounded-full hover:bg-accent/80" aria-label="Toggle clock type">
          {clockType === 'digital' ? <TabletSmartphone className="h-6 w-6" /> : <Clock4 className="h-6 w-6" />}
        </Button>
        {clockType === 'analog' && (
          <>
            <Button variant={dialShape === 'round' ? 'secondary' : 'ghost'} size="icon" onClick={() => setDialShape('round')} className="h-12 w-12 rounded-full hover:bg-accent/80" aria-label="Round dial">
              <Circle className="h-6 w-6" />
            </Button>
            <Button variant={dialShape === 'square' ? 'secondary' : 'ghost'} size="icon" onClick={() => setDialShape('square')} className="h-12 w-12 rounded-full hover:bg-accent/80" aria-label="Square dial">
              <Square className="h-6 w-6" />
            </Button>
            <Button variant={dialShape === 'oval' ? 'secondary' : 'ghost'} size="icon" onClick={() => setDialShape('oval')} className="h-12 w-12 rounded-full hover:bg-accent/80" aria-label="Oval dial">
              <Ellipsis className="h-6 w-6" />
            </Button>
          </>
        )}
         {clockType === 'digital' && (
            <Button variant="ghost" size="icon" onClick={() => setTimeFormat(timeFormat === '12h' ? '24h' : '12h')} className="h-12 w-12 rounded-full hover:bg-accent/80" aria-label="Toggle time format">
                <span className="text-lg font-bold">{timeFormat === '12h' ? '12h' : '24h'}</span>
            </Button>
        )}
        <Button asChild variant="ghost" size="icon" className="h-12 w-12 rounded-full hover:bg-accent/80" aria-label="Yearly Calendar">
          <Link href="/calendar">
            <CalendarIcon className="h-6 w-6" />
          </Link>
        </Button>
        <Button variant="ghost" size="icon" onClick={() => setShowBirthdayList(true)} className="h-12 w-12 rounded-full hover:bg-accent/80" aria-label="Show birthdays">
            <Gift className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'default' : 'dark')}
          className="h-12 w-12 rounded-full hover:bg-accent/80"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
        </Button>
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
            <SheetContent className="w-[400px] sm:w-[540px]">
              <SheetHeader>
                <SheetTitle>Settings</SheetTitle>
              </SheetHeader>
              <ScrollArea className="h-[calc(100%-4rem)]">
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

    </main>
  );
}
