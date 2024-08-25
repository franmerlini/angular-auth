import { Country } from './country.model';
import { Role } from './role.model';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  country: Country;
  role: Role;
  password: string;
  picture: string;
}
