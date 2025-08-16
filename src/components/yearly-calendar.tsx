
'use client';

import { Calendar } from '@/components/ui/calendar';
import { Gift } from 'lucide-react';

interface YearlyCalendarProps {
  year: number;
  onBirthdayClick: () => void;
}

export default function YearlyCalendar({ year, onBirthdayClick }: YearlyCalendarProps) {
  const months = Array.from({ length: 12 }, (_, i) => new Date(year, i, 1));
  const birthday = new Date(year, 8, 18); // September 18

  const handleDayClick = (day: Date) => {
    if (day.getMonth() === 8 && day.getDate() === 18) {
      onBirthdayClick();
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {months.map((month, index) => (
        <div key={index} className="rounded-xl border bg-card text-card-foreground shadow-sm">
          <h3 className="p-3 text-center text-lg font-semibold">
            {month.toLocaleString('default', { month: 'long' })}
          </h3>
          <Calendar
            month={month}
            mode="single"
            onDayClick={handleDayClick}
            selected={new Date(year, month.getMonth(), new Date().getDate())} // Keep day consistent for visual selection
            classNames={{
              root: 'w-full',
              months: 'w-full',
              month: 'w-full space-y-4 p-3 pt-0',
              caption: 'hidden',
              head_row: 'flex justify-center',
              head_cell: 'w-10 text-muted-foreground rounded-md font-normal text-sm',
              row: 'flex w-full mt-2 justify-center',
              cell: 'h-10 w-10 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
              day: 'h-10 w-10 p-0 font-normal aria-selected:opacity-100',
              day_selected:
                'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
              day_today: 'bg-accent text-accent-foreground rounded-full',
              day_outside: 'text-muted-foreground opacity-50',
            }}
            showOutsideDays={false}
            components={{
              DayContent: ({ date }) => {
                const isBirthday = date.getMonth() === 8 && date.getDate() === 18;
                return (
                  <div className="relative flex h-full w-full items-center justify-center">
                    <span>{date.getDate()}</span>
                    {isBirthday && (
                      <Gift className="absolute bottom-1 right-1 h-3 w-3 text-destructive" />
                    )}
                  </div>
                );
              },
            }}
             modifiers={{
              birthday: birthday,
            }}
            modifiersClassNames={{
              birthday: 'border-2 border-destructive rounded-full',
            }}
          />
        </div>
      ))}
    </div>
  );
}
