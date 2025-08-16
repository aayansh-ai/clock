
'use client';

import { Calendar } from '@/components/ui/calendar';
import { Gift } from 'lucide-react';
import { birthdays, type Birthday } from '@/lib/types';

interface MonthlyCalendarProps {
  onBirthdayClick: (birthday: Birthday) => void;
}

export default function MonthlyCalendar({ onBirthdayClick }: MonthlyCalendarProps) {
  const today = new Date();
  
  const birthdayDates = birthdays.map(b => new Date(today.getFullYear(), b.month, b.day));

  const handleDayClick = (day: Date) => {
    // Find all birthdays on the clicked day
    const birthdaysOnDay = birthdays.filter(b => b.month === day.getMonth() && b.day === day.getDate());
    
    if (birthdaysOnDay.length > 0) {
      // Prioritize the birthday entry that has a custom message for shared birthdays.
      const birthdayToCelebrate = birthdaysOnDay.find(b => !!b.message) || birthdaysOnDay[0];
      onBirthdayClick(birthdayToCelebrate);
    }
  };

  const isBirthday = (date: Date) => {
    return birthdays.some(b => b.month === date.getMonth() && b.day === date.getDate());
  }

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
            if (isBirthday(date)) {
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
          birthday: birthdayDates,
        }}
        modifiersClassNames={{
          birthday: 'border-2 border-destructive rounded-full',
        }}
      />
    </div>
  );
}
