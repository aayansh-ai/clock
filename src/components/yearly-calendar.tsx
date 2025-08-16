
'use client';

import { Calendar } from '@/components/ui/calendar';

interface YearlyCalendarProps {
  year: number;
}

export default function YearlyCalendar({ year }: YearlyCalendarProps) {
  const months = Array.from({ length: 12 }, (_, i) => new Date(year, i, 1));

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {months.map((month, index) => (
        <div key={index} className="rounded-lg border bg-card text-card-foreground">
          <Calendar
            month={month}
            mode="single"
            selected={new Date()}
            classNames={{
              month: 'space-y-4 p-3',
              caption_label: 'text-lg font-bold',
              day_today: 'bg-accent text-accent-foreground rounded-full',
            }}
            showOutsideDays={false}
          />
        </div>
      ))}
    </div>
  );
}
