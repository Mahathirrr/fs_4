export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: 'student' | 'instructor';
}

export interface Session {
  user: User;
  expires: string;
}