
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
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {months.map((month, index) => (
        <div key={index} className="rounded-lg border bg-card text-card-foreground">
          <Calendar
            month={month}
            mode="single"
            onDayClick={handleDayClick}
            selected={new Date(year, month.getMonth(), new Date().getDate())} // Keep day consistent for visual selection
            classNames={{
              month: 'space-y-4 p-3',
              caption_label: 'text-lg font-bold',
              day_today: 'bg-accent text-accent-foreground rounded-full',
            }}
            showOutsideDays={false}
            components={{
              DayContent: ({ date }) => {
                const isBirthday = date.getMonth() === 8 && date.getDate() === 18;
                return (
                  <div className="relative flex h-full w-full items-center justify-center">
                    <span>{date.getDate()}</span>
                    {isBirthday && (
                      <Gift className="absolute bottom-0 right-0 h-3 w-3 text-destructive" />
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
