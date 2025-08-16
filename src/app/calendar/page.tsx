
'use client';

import { useState } from 'react';
import Link from 'next/link';
import YearlyCalendar from '@/components/yearly-calendar';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';
import BirthdayCelebration from '@/components/BirthdayCelebration';


export default function CalendarPage() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [birthdayPerson, setBirthdayPerson] = useState<string | null>(null);

  const handleBirthdayClick = (name: string) => {
    setBirthdayPerson(name);
  };
  
  const getCelebrationMessage = () => {
    if (birthdayPerson === 'Aayansh') return "Happy Birthday Aayansh!!!";
    if (birthdayPerson) return `Happy Birthday ${birthdayPerson}`;
    return "";
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {birthdayPerson && (
        <BirthdayCelebration 
          message={getCelebrationMessage()} 
          onComplete={() => setBirthdayPerson(null)} 
        />
      )}
      <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-background/80 px-4 py-2 backdrop-blur-sm sm:px-6">
        <Button asChild variant="ghost" size="icon">
          <Link href="/">
            <Home className="h-5 w-5" />
            <span className="sr-only">Home</span>
          </Link>
        </Button>
        <div className="flex items-center gap-2 sm:gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setYear(year - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-xl font-bold sm:text-2xl">{year}</h1>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setYear(year + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="w-9" /> 
      </header>
      <main className="mx-auto w-[75vw] p-4 sm:p-6">
        <YearlyCalendar year={year} onBirthdayClick={handleBirthdayClick} />
      </main>
    </div>
  );
}
