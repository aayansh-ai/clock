
'use client';

import { Calendar } from '@/components/ui/calendar';

export default function MonthlyCalendar() {
  return (
    <div className="rounded-lg border bg-background/50 p-0 backdrop-blur-sm">
      <Calendar
        mode="single"
        selected={new Date()}
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
      />
    </div>
  );
}
