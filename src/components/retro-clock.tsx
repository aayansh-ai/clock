
'use client';

import { useState, useEffect } from 'react';

const SevenSegment = ({ digit, glow = false }: { digit: string, glow?: boolean }) => (
  <span className={`font-segment text-7xl md:text-8xl lg:text-9xl ${glow ? 'text-red-500' : 'text-red-500/20'}`} style={{ textShadow: glow ? '0 0 15px rgba(255,0,0,0.7)' : 'none' }}>
    {digit === ' ' ? <span className="opacity-0">0</span> : digit}
  </span>
);

const LabeledDisplay = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex items-center gap-3">
    {children}
    <span className="text-2xl font-semibold tracking-widest text-white/80">{label}</span>
  </div>
);

const DayIndicator = ({ day, active }: { day: string; active: boolean }) => (
    <div className="flex flex-col items-center gap-1">
        <span className="text-white/80 font-semibold text-lg">{day}</span>
        <div className={`w-6 h-3 rounded-full border-2 border-white/50 ${active ? 'bg-red-500' : 'bg-transparent'}`}></div>
    </div>
);


export default function RetroClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  const formatTwoDigits = (n: number) => n.toString().padStart(2, '0');

  const date = formatTwoDigits(time.getDate());
  const month = formatTwoDigits(time.getMonth() + 1);
  const year = time.getFullYear().toString();
  const hours = formatTwoDigits(time.getHours());
  const minutes = formatTwoDigits(time.getMinutes());
  const seconds = formatTwoDigits(time.getSeconds());
  const ampm = time.getHours() >= 12 ? 'PM' : 'AM';
  const dayOfWeek = time.getDay(); // 0 = Sunday, 1 = Monday, etc.

  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  return (
    <div className="z-10 relative flex w-full max-w-4xl flex-col items-center justify-center rounded-2xl border-8 border-gray-700 bg-black p-6 md:p-8 shadow-2xl">
      {/* Top decorative text */}
      <div className="absolute top-4 left-6">
        <h2 className="font-bold text-white text-xl">Ajanta</h2>
        <p className="text-sm text-white/70">SINCE 1971</p>
      </div>
      <div className="absolute top-6 right-6">
        <h3 className="text-xl text-white/90" style={{ fontFamily: '"Brush Script MT", cursive' }}>Computer Century Calendar</h3>
      </div>
      
      {/* Main content */}
      <div className="mt-16 flex flex-col gap-6 w-full">
        {/* Date Row */}
        <div className="flex w-full justify-between rounded-lg border-4 border-gray-600 bg-gray-800/50 p-4">
          <LabeledDisplay label="DATE">
            <SevenSegment digit={date[0]} glow />
            <SevenSegment digit={date[1]} glow />
          </LabeledDisplay>
          <LabeledDisplay label="MONTH">
            <SevenSegment digit={month[0]} glow />
            <SevenSegment digit={month[1]} glow />
          </LabeledDisplay>
          <LabeledDisplay label="YEAR">
            <SevenSegment digit={year[0]} glow />
            <SevenSegment digit={year[1]} glow />
            <SevenSegment digit={year[2]} glow />
            <SevenSegment digit={year[3]} glow />
          </LabeledDisplay>
        </div>

        {/* Time Row */}
        <div className="flex w-full items-center justify-between rounded-lg border-4 border-gray-600 bg-gray-800/50 p-4">
           <span className="text-5xl font-bold tracking-widest text-white/80">TIME</span>
           <div className="flex items-center gap-2">
            <SevenSegment digit={hours[0]} glow />
            <SevenSegment digit={hours[1]} glow />
            <SevenSegment digit=":" glow />
            <SevenSegment digit={minutes[0]} glow />
            <SevenSegment digit={minutes[1]} glow />
            <SevenSegment digit=":" glow />
            <SevenSegment digit={seconds[0]} glow />
            <SevenSegment digit={seconds[1]} glow />
           </div>
           <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full border-2 border-white/50 ${ampm === 'AM' ? 'bg-red-500' : ''}`}></div>
                    <span className="text-white font-semibold">AM</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full border-2 border-white/50 ${ampm === 'PM' ? 'bg-red-500' : ''}`}></div>
                    <span className="text-white font-semibold">PM</span>
                </div>
           </div>
        </div>

        {/* Day and Temp Row */}
        <div className="flex w-full items-end justify-between">
            <div className="flex gap-4 rounded-lg border-4 border-gray-600 bg-gray-800/50 p-3">
                {days.map((day, index) => (
                    <DayIndicator key={day} day={day} active={index === dayOfWeek} />
                ))}
            </div>
            <div className="flex items-baseline gap-3 rounded-lg border-4 border-gray-600 bg-gray-800/50 p-4">
                <span className="text-4xl font-bold tracking-widest text-white/80">TEMP.</span>
                <div className="flex items-center">
                    <SevenSegment digit="2" glow />
                    <SevenSegment digit="6" glow />
                </div>
                <span className="text-4xl font-bold text-white/80">°C</span>
            </div>
        </div>
      </div>
       <p className="absolute bottom-4 right-6 text-sm text-white/70">OLC-104</p>
    </div>
  );
}
