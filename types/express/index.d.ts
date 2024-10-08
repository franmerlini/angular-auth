declare namespace Express {
  interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  }

  interface Request {
    user?: User;
  }
}
