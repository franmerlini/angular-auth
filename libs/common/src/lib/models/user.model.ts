import { Country } from './country.model';

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  country: Country;
  // role: string;
  // token: string;
};
