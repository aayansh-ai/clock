
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { birthdays } from '@/lib/types';
import { Gift, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface BirthdayListDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function BirthdayListDialog({ open, onOpenChange }: BirthdayListDialogProps) {
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
        daysUntil: Math.ceil((birthdayDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)),
      };
    })
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Gift className="h-6 w-6 text-destructive" />
            Family Birthdays
          </DialogTitle>
          <DialogDescription>
            Here are all the upcoming special days to remember.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {upcomingBirthdays.map((b) => (
            <div key={b.name} className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <p className="font-semibold text-primary">{b.name}</p>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {format(b.date, 'MMMM do')}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg text-foreground">{b.daysUntil}</p>
                <p className="text-xs text-muted-foreground">days away</p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
