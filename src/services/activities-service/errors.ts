import { ApplicationError } from '@/protocols';

export function withoutVacanciesError(): ApplicationError {
  return {
    name: 'WithoutVacanciesError',
    message: 'This activity is at capacity',
  };
}
console.log('teste');
