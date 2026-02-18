export type UserRole = 'student' | 'instructor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  createdAt: string;
}

export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';
export type CourseCategory = 'web-dev' | 'data-science' | 'mobile' | 'devops' | 'ai-ml' | 'design' | 'business';

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: number;
  order: number;
  isPreview: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructorId: string;
  instructorName: string;
  price: number;
  level: CourseLevel;
  category: CourseCategory;
  tags: string[];
  lessons: Lesson[];
  totalDuration: number;
  rating: number;
  studentsCount: number;
  isFeatured: boolean;
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'student' | 'instructor';
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface Activity {
  id: string;
  type: 'enrollment' | 'completion' | 'achievement';
  title: string;
  description: string;
  timestamp: string;
}
