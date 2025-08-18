
'use client';

import { useState, useEffect } from 'react';
import type { TimeFormat } from '@/lib/types';
import { birthdays } from '@/lib/types';
import { format } from 'date-fns';

const SevenSegment = ({ digit, glow = false }: { digit: string, glow?: boolean }) => (
  <span 
    className={`font-segment text-5xl md:text-6xl ${glow ? 'text-red-500' : 'text-red-500/20'}`} 
    style={{ textShadow: glow ? '0 0 10px rgba(255,0,0,0.6)' : 'none' }}
  >
    {digit === ' ' ? <span className="opacity-0">0</span> : digit}
  </span>
);

const LabeledDisplay = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex items-center gap-2">
    {children}
    <span className="text-lg font-semibold tracking-widest text-white/80">{label}</span>
  </div>
);

const DayIndicator = ({ day, active }: { day: string; active: boolean }) => (
    <div className="flex flex-col items-center gap-1">
        <span className="text-white/80 font-semibold text-sm">{day}</span>
        <div className={`w-5 h-2.5 rounded-full border-2 border-white/50 ${active ? 'bg-red-500' : 'bg-transparent'}`}></div>
    </div>
);


export default function RetroClock({ timeFormat }: { timeFormat: TimeFormat }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  const formatTwoDigits = (n: number) => n.toString().padStart(2, '0');

  const date = formatTwoDigits(time.getDate());
  const month = formatTwoDigits(time.getMonth() + 1);
  const year = time.getFullYear().toString();
  
  let hours = time.getHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  if (timeFormat === '12h') {
    hours = hours % 12;
    if (hours === 0) hours = 12; // 12am
  }
  
  const formattedHours = formatTwoDigits(hours);
  const minutes = formatTwoDigits(time.getMinutes());
  const seconds = formatTwoDigits(time.getSeconds());
  
  const dayOfWeek = time.getDay(); // 0 = Sunday, 1 = Monday, etc.
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const getUpcomingBirthday = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcomingBirthdays = birthdays
      .map(b => {
        const birthdayDate = new Date(today.getFullYear(), b.month, b.day);
        if (birthdayDate < today) {
          birthdayDate.setFullYear(today.getFullYear() + 1);
        }
        return {
          ...b,
          date: birthdayDate,
        };
      })
      .sort((a, b) => a.date.getTime() - b.date.getTime());
    
    return upcomingBirthdays[0];
  };

  const nextBirthday = getUpcomingBirthday();
  const upcomingEventMessage = `Next is ${nextBirthday.name}'s Birthday on ${format(nextBirthday.date, 'MMMM do')}.`;


  return (
    <div className="z-10 relative flex w-full max-w-3xl flex-col items-center justify-center rounded-2xl border-8 border-gray-700 bg-black p-4 md:p-6 shadow-2xl">
      {/* Top decorative text */}
      <div className="absolute top-3 left-4 text-white">
        <h2 className="font-bold text-lg">Aayansh</h2>
        <p className="text-xs text-white/70">SINCE Etenity</p>
      </div>
      <div className="absolute top-4 right-4">
        <h3 className="text-sm text-white/90" style={{ fontFamily: '"Brush Script MT", cursive' }}>
          {upcomingEventMessage}
        </h3>
      </div>
      
      {/* Main content */}
      <div className="mt-12 flex w-full flex-col gap-4">
        {/* Date Row */}
        <div className="flex w-full justify-between rounded-lg border-4 border-gray-600 bg-gray-800/50 p-3">
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
        <div className="flex w-full items-center justify-between rounded-lg border-4 border-gray-600 bg-gray-800/50 p-3">
           <span className="text-4xl font-bold tracking-widest text-white/80">TIME</span>
           <div className="flex items-center gap-1">
            <SevenSegment digit={formattedHours[0]} glow />
            <SevenSegment digit={formattedHours[1]} glow />
            <SevenSegment digit=":" glow />
            <SevenSegment digit={minutes[0]} glow />
            <SevenSegment digit={minutes[1]} glow />
            <SevenSegment digit=":" glow />
            <SevenSegment digit={seconds[0]} glow />
            <SevenSegment digit={seconds[1]} glow />
           </div>
           <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full border-2 border-white/50 ${timeFormat === '12h' && ampm === 'AM' ? 'bg-red-500' : ''}`}></div>
                    <span className="text-white font-semibold text-sm">AM</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full border-2 border-white/50 ${timeFormat === '12h' && ampm === 'PM' ? 'bg-red-500' : ''}`}></div>
                    <span className="text-white font-semibold text-sm">PM</span>
                </div>
           </div>
        </div>

        {/* Day and Temp Row */}
        <div className="flex w-full items-stretch justify-between gap-4">
            <div className="flex-1 flex items-center justify-center gap-3 rounded-lg border-4 border-gray-600 bg-gray-800/50 p-3">
                {days.map((day, index) => (
                    <DayIndicator key={day} day={day} active={index === dayOfWeek} />
                ))}
            </div>
            <div className="flex-1 flex items-center justify-center gap-2 rounded-lg border-4 border-gray-600 bg-gray-800/50 p-3">
                <span className="text-3xl font-bold tracking-widest text-white/80">TEMP.</span>
                <div className="flex items-center">
                    <SevenSegment digit="2" glow />
                    <SevenSegment digit="6" glow />
                </div>
                <span className="text-3xl font-bold text-white/80">°C</span>
            </div>
        </div>
      </div>
       <p className="absolute bottom-2 right-4 text-xs text-white/70">My Watch</p>
    </div>
  );
}
