/// <reference types="vite/client" />

import { Activity, Course, Enrollment, Lesson, LoginCredentials, SignupData, User, UserRole } from '../types';

export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ??
  import.meta.env.VITE_API_URL ??
  'http://localhost:3000'
).replace(/\/$/, '');

type ApiUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  bio?: string;
  createdAt?: string;
};

type AuthResponse = {
  success: boolean;
  message?: string;
  user?: ApiUser;
  token?: string;
};

type EnrollmentDTO = {
  id: string;
  courseId: string;
  courseTitle: string;
  courseThumbnail?: string;
  instructorName: string;
  progress: number;
  enrolledAt?: string;
  completedAt?: string | null;
};

type ActivityDTO = {
  id: string;
  type: string;
  title: string;
  description: string;
  timestamp: string;
};

type InstructorAnalyticsDTO = {
  totalCourses: number;
  totalStudents: number;
  averageRating: number;
};

type AdminAnalyticsDTO = {
  totalUsers: number;
  totalStudents: number;
  totalInstructors: number;
  totalCourses: number;
  totalEnrollments: number;
};

type CourseListDTO = {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  instructorId?: string;
  instructorName: string;
  price: number | string;
  level: string;
  category: string;
  tags?: string[];
  totalDuration?: number;
  rating?: number;
  studentsCount?: number;
  isFeatured?: boolean;
  createdAt?: string;
};

type LessonDTO = {
  id: string;
  title: string;
  description?: string;
  duration?: number;
  order?: number;
  isPreview?: boolean;
};

type CourseDTO = CourseListDTO & {
  lessons?: LessonDTO[];
};

type CreateInstructorLessonRequest = {
  title: string;
  description?: string;
  duration: number;
  order: number;
  isPreview?: boolean;
  videoUrl?: string;
  content?: string;
};

type CreateInstructorCourseRequest = {
  title: string;
  description: string;
  thumbnail?: string;
  price: number;
  level: string;
  category: string;
  tags?: string[];
  lessons: CreateInstructorLessonRequest[];
};

type RegisterUnilinkLeadRequest = {
  name: string;
  phone: string;
};

export type HomeStats = {
  studentsEnrolled: number;
  expertCourses: number;
  satisfactionRate: number | null;
  proInstructors: number;
  updatedAt: string;
};

async function apiFetch<T>(path: string, options: RequestInit = {}, token?: string): Promise<T> {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers ?? {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const response = await fetch(`${API_BASE_URL}${normalizedPath}`, {
    ...options,
    headers,
  });

  const contentType = response.headers.get('content-type') || '';
  const payload = contentType.includes('application/json') ? await response.json() : await response.text();

  if (!response.ok) {
    const message = (typeof payload === 'string' ? payload : payload?.message) || `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return payload as T;
}

async function apiUpload<T>(path: string, formData: FormData, token: string): Promise<T> {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const headers = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const response = await fetch(`${API_BASE_URL}${normalizedPath}`, {
    method: 'POST',
    headers,
    body: formData,
  });

  const contentType = response.headers.get('content-type') || '';
  const payload = contentType.includes('application/json') ? await response.json() : await response.text();

  if (!response.ok) {
    const message = (typeof payload === 'string' ? payload : payload?.message) || `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return payload as T;
}

export async function registerUnilinkLead(payload: RegisterUnilinkLeadRequest) {
  return apiFetch<{ success: boolean; id?: string; message?: string }>('/api/unilink/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function fetchHomeStats() {
  return apiFetch<HomeStats>('/api/public/home-stats');
}

const toUser = (apiUser: ApiUser): User => ({
  id: apiUser.id,
  name: apiUser.name,
  email: apiUser.email,
  role: (apiUser.role as UserRole) ?? 'student',
  avatar: apiUser.avatar ?? undefined,
  bio: apiUser.bio ?? undefined,
  createdAt: apiUser.createdAt ?? '',
});

const toEnrollment = (dto: EnrollmentDTO): Enrollment => ({
  id: dto.id,
  courseId: dto.courseId,
  courseTitle: dto.courseTitle,
  courseThumbnail: dto.courseThumbnail ?? '',
  instructorName: dto.instructorName,
  progress: dto.progress ?? 0,
  enrolledAt: dto.enrolledAt ?? '',
  completedAt: dto.completedAt ?? null,
});

const toActivity = (dto: ActivityDTO): Activity => ({
  id: dto.id,
  type: (dto.type as Activity['type']) ?? 'enrollment',
  title: dto.title,
  description: dto.description,
  timestamp: dto.timestamp,
});

const toLesson = (lesson: LessonDTO): Lesson => ({
  id: lesson.id,
  title: lesson.title,
  description: lesson.description ?? '',
  duration: lesson.duration ?? 0,
  order: lesson.order ?? 0,
  isPreview: Boolean(lesson.isPreview),
});

const toCourse = (dto: CourseListDTO | CourseDTO): Course => ({
  id: dto.id,
  title: dto.title,
  description: dto.description ?? '',
  thumbnail: dto.thumbnail ?? '',
  instructorId: (dto as CourseDTO).instructorId ?? '',
  instructorName: dto.instructorName,
  price: Number(dto.price ?? 0),
  level: dto.level as Course['level'],
  category: dto.category as Course['category'],
  tags: dto.tags ?? [],
  lessons: 'lessons' in dto && dto.lessons ? dto.lessons.map(toLesson) : [],
  totalDuration: dto.totalDuration ?? 0,
  rating: dto.rating ?? 0,
  studentsCount: dto.studentsCount ?? 0,
  isFeatured: Boolean(dto.isFeatured),
  createdAt: dto.createdAt ?? '',
});

export async function loginUser(credentials: LoginCredentials) {
  const res = await apiFetch<AuthResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
  return { ...res, user: res.user ? toUser(res.user) : undefined };
}

export async function signupUser(data: SignupData) {
  const res = await apiFetch<AuthResponse>('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return { ...res, user: res.user ? toUser(res.user) : undefined };
}

export async function fetchCurrentUser(token: string) {
  return apiFetch<ApiUser>('/api/auth/me', { method: 'GET' }, token).then(toUser);
}

export async function fetchCourses() {
  const data = await apiFetch<CourseListDTO[]>('/api/courses');
  return data.map(toCourse);
}

export async function fetchFeaturedCourses() {
  const data = await apiFetch<CourseListDTO[]>('/api/courses/featured');
  return data.map(toCourse);
}

export async function fetchCourseById(id: string, token?: string) {
  const data = await apiFetch<CourseDTO>(`/api/courses/${id}`, { method: 'GET' }, token);
  return toCourse(data);
}

export async function enrollInCourse(id: string, token: string) {
  return apiFetch(`/api/courses/${id}/enroll`, { method: 'POST' }, token);
}

export async function fetchStudentEnrollments(token: string) {
  const data = await apiFetch<EnrollmentDTO[]>('/api/student/courses', { method: 'GET' }, token);
  return data.map(toEnrollment);
}

export async function updateEnrollmentProgress(enrollmentId: string, progress: number, token: string) {
  const data = await apiFetch<EnrollmentDTO>(`/api/student/enrollments/${enrollmentId}/progress`, {
    method: 'PUT',
    body: JSON.stringify({ progress }),
  }, token);
  return toEnrollment(data);
}

export async function fetchStudentActivities(token: string) {
  const data = await apiFetch<ActivityDTO[]>('/api/student/activities', { method: 'GET' }, token);
  return data.map(toActivity);
}

export async function fetchInstructorCourses(token: string) {
  const data = await apiFetch<CourseListDTO[]>('/api/instructor/courses', { method: 'GET' }, token);
  return data.map(toCourse);
}

export async function fetchInstructorAnalytics(token: string) {
  return apiFetch<InstructorAnalyticsDTO>('/api/instructor/analytics', { method: 'GET' }, token);
}

export async function createInstructorCourse(payload: CreateInstructorCourseRequest, token: string) {
  const data = await apiFetch<CourseDTO>('/api/instructor/courses', {
    method: 'POST',
    body: JSON.stringify(payload),
  }, token);
  return toCourse(data);
}

export async function uploadLessonVideo(lessonId: string, file: File, token: string) {
  const form = new FormData();
  form.append('file', file);
  return apiUpload(`/api/instructor/lessons/${lessonId}/video`, form, token);
}

export async function fetchLessonPlaybackUrl(lessonId: string, token: string) {
  const data = await apiFetch<{ url: string }>(`/api/media/lessons/${lessonId}/playback`, { method: 'GET' }, token);
  return data.url;
}

export async function fetchAdminAnalytics(token: string) {
  return apiFetch<AdminAnalyticsDTO>('/api/admin/analytics', { method: 'GET' }, token);
}

export async function fetchAdminCourses(token: string) {
  const data = await apiFetch<CourseListDTO[]>('/api/admin/courses', { method: 'GET' }, token);
  return data.map(toCourse);
}

export async function fetchAdminUsers(token: string) {
  const data = await apiFetch<ApiUser[]>('/api/admin/users', { method: 'GET' }, token);
  return data.map(toUser);
}

export async function adminResetUserPassword(userId: string, newPassword: string, token: string) {
  return apiFetch(`/api/admin/users/${userId}/reset-password`, {
    method: 'POST',
    body: JSON.stringify({ newPassword }),
  }, token);
}

export async function adminDeleteUser(userId: string, token: string) {
  return apiFetch(`/api/admin/users/${userId}`, { method: 'DELETE' }, token);
}
