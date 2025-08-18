
'use client';

import { Calendar } from '@/components/ui/calendar';
import { Gift } from 'lucide-react';
import { birthdays, type Birthday } from '@/lib/types';
import { isSameDay } from 'date-fns';

interface YearlyCalendarProps {
  year: number;
  onBirthdayClick: (birthday: Birthday) => void;
}

export default function YearlyCalendar({ year, onBirthdayClick }: YearlyCalendarProps) {
  const months = Array.from({ length: 12 }, (_, i) => new Date(year, i, 1));
  const today = new Date();
  
  const birthdayDates = birthdays.map(b => new Date(year, b.month, b.day));

  const handleDayClick = (day: Date) => {
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
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {months.map((month, index) => (
        <div key={index} className="rounded-xl border bg-card/80 text-card-foreground shadow-sm backdrop-blur-sm">
          <h3 className="p-3 text-center text-lg font-semibold">
            {month.toLocaleString('default', { month: 'long' })}
          </h3>
          <Calendar
            month={month}
            mode="single"
            onDayClick={handleDayClick}
            selected={today}
            classNames={{
              root: 'w-full',
              months: 'w-full',
              month: 'w-full space-y-4 p-3 pt-0',
              caption: 'hidden',
              head_row: 'flex',
              head_cell: 'w-10 text-muted-foreground rounded-md font-normal text-sm',
              row: 'flex w-full mt-2',
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
                if (isBirthday(date)) {
                  return (
                    <div className="relative flex h-full w-full items-center justify-center">
                      <span>{date.getDate()}</span>
                      <Gift className="absolute bottom-1 right-1 h-3 w-3 text-destructive" />
                    </div>
                  );
                }
                return <div>{date.getDate()}</div>;
              },
            }}
             modifiers={{
              birthday: date => birthdayDates.some(bd => isSameDay(date, bd)),
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
