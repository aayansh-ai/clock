
'use client';

import { useState } from 'react';
import Link from 'next/link';
import YearlyCalendar from '@/components/yearly-calendar';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';


export default function CalendarPage() {
  const [year, setYear] = useState(new Date().getFullYear());
  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-background/80 px-4 py-2 backdrop-blur-sm">
        <Button asChild variant="ghost" size="icon">
          <Link href="/">
            <Home className="h-5 w-5" />
            <span className="sr-only">Home</span>
          </Link>
        </Button>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setYear(year - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-xl font-bold">{year}</h1>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setYear(year + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="w-8" /> 
      </header>
      <main className="container mx-auto p-4">
        <YearlyCalendar year={year} />
      </main>
    </div>
  );
}
