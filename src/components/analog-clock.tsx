
"use client";

import { useState, useEffect } from "react";
import type { DialShape } from "@/lib/types";
import { cn } from "@/lib/utils";

interface AnalogClockProps {
  shape: DialShape;
}

export default function AnalogClock({ shape }: AnalogClockProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const secondHandRotation = (seconds / 60) * 360;
  const minuteHandRotation = (minutes / 60) * 360 + (seconds / 60) * 6;
  const hourHandRotation = (hours / 12) * 360 + (minutes / 60) * 30;
  
  const shapeClasses = {
    round: "rounded-full w-80 h-80",
    square: "rounded-lg w-80 h-80",
    oval: "rounded-[50%] w-72 h-96",
  };

  const numbers = Array.from({ length: 12 }, (_, i) => i + 1);

  const getNumberPosition = (hour: number) => {
    const angle = (hour * 30) - 90; // -90 to start from the top
    const angleInRad = (angle * Math.PI) / 180;
    const x = 50 + 42 * Math.cos(angleInRad);
    const y = 50 + 42 * Math.sin(angleInRad);
    return { left: `${x}%`, top: `${y}%` };
  };

  return (
    <div className={cn("relative border-4 border-primary bg-background/70 backdrop-blur-sm shadow-lg", shapeClasses[shape])} style={{ textShadow: '0 2px 6px rgba(0,0,0,0.5)' }}>
      {numbers.map((hour) => (
        <div
          key={hour}
          className="absolute -translate-x-1/2 -translate-y-1/2 text-lg font-bold text-foreground"
          style={getNumberPosition(hour)}
        >
          {hour}
        </div>
      ))}
      
      {/* Hour hand */}
      <div
        className="absolute top-1/2 left-1/2 w-1 h-1/4 origin-top bg-foreground"
        style={{
          transform: `translate(-50%, -100%) rotate(${hourHandRotation}deg)`,
          transformOrigin: 'bottom',
          height: '20%',
          width: '6px',
        }}
      />
      {/* Minute hand */}
      <div
        className="absolute top-1/2 left-1/2 w-1 h-1/3 origin-top bg-foreground"
        style={{
          transform: `translate(-50%, -100%) rotate(${minuteHandRotation}deg)`,
          transformOrigin: 'bottom',
           height: '30%',
           width: '4px',
        }}
      />
      {/* Second hand */}
      <div
        className="absolute top-1/2 left-1/2 w-0.5 h-2/5 origin-top bg-destructive"
        style={{
          transform: `translate(-50%, -100%) rotate(${secondHandRotation}deg)`,
          transformOrigin: 'bottom',
          height: '35%',
          width: '2px',
        }}
      />
       {/* Center circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-destructive" />
    </div>
  );
}
