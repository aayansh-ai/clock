
"use client";

import { useState, useEffect } from "react";
import type { TimeFormat } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ClockProps {
  timeFormat: TimeFormat;
  showDate: boolean;
}

export default function Clock({ timeFormat, showDate }: ClockProps) {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: timeFormat === "12h",
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formattedTime = new Intl.DateTimeFormat("en-US", timeOptions).format(
    date
  );
  const formattedDate = new Intl.DateTimeFormat("en-US", dateOptions).format(
    date
  );

  return (
    <div className="flex flex-col items-center justify-center text-center text-foreground">
      <h1 className="font-headline text-7xl font-black tracking-tighter sm:text-8xl md:text-9xl" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
        {formattedTime}
      </h1>
      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          showDate ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        {showDate && (
          <p className="font-body mt-2 text-xl text-muted-foreground md:text-2xl" style={{ textShadow: '0 2px 6px rgba(0,0,0,0.5)' }}>
            {formattedDate}
          </p>
        )}
      </div>
    </div>
  );
}
