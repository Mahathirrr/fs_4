export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructor: {
    id: string;
    name: string;
    avatar: string;
  };
  price: number;
  rating: number;
  totalStudents: number;
  totalDuration: string;
  level: 'Pemula' | 'Menengah' | 'Lanjutan';
  category: string;
}