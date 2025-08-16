
'use client';

import { Calendar } from '@/components/ui/calendar';
import { Gift } from 'lucide-react';

interface MonthlyCalendarProps {
  onBirthdayClick: () => void;
}

export default function MonthlyCalendar({ onBirthdayClick }: MonthlyCalendarProps) {
  const today = new Date();
  const birthday = new Date(today.getFullYear(), 8, 18); // September 18

  const handleDayClick = (day: Date) => {
    if (day.getMonth() === 8 && day.getDate() === 18) {
      onBirthdayClick();
    }
  };

  return (
    <div className="rounded-lg border bg-background/50 p-0 backdrop-blur-sm">
      <Calendar
        mode="single"
        selected={new Date()}
        onDayClick={handleDayClick}
        className="p-3"
        classNames={{
          head_cell: 'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
          cell: 'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
          day: 'h-9 w-9 p-0 font-normal aria-selected:opacity-100',
          day_selected:
            'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
          day_today: 'bg-accent text-accent-foreground rounded-full',
          day_outside: 'text-muted-foreground opacity-50',
        }}
        components={{
          DayContent: ({ date }) => {
            if (date.getMonth() === 8 && date.getDate() === 18) {
              return (
                <div className="relative flex h-full w-full items-center justify-center">
                  <span>{date.getDate()}</span>
                  <Gift className="absolute bottom-0 right-0 h-3 w-3 text-destructive" />
                </div>
              );
            }
            return <div>{date.getDate()}</div>;
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
  );
}
