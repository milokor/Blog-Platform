import { format, parseISO } from 'date-fns';

export const dateParse = (date: string | undefined) => {
  return date !== undefined ? format(parseISO(date), 'MMMM d, yyyy') : null;
};
