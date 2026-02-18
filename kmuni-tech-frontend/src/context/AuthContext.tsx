import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { User, AuthState, LoginCredentials, SignupData } from '../types';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; message: string }>;
  signup: (data: SignupData) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

type AuthAction =
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'UPDATE_USER'; payload: Partial<User> };

const initialState: AuthState = {
  user: null, token: null, isAuthenticated: false, isLoading: true,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, user: action.payload.user, token: action.payload.token, isAuthenticated: true, isLoading: false };
    case 'LOGOUT':
      return { ...initialState, isLoading: false };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'UPDATE_USER':
      return { ...state, user: state.user ? { ...state.user, ...action.payload } : null };
    default:
      return state;
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo — replace login/signup bodies with real Spring Boot API calls
const MOCK_USERS: User[] = [
  { id: '1', name: 'Alex Johnson', email: 'student@kmuni.com', role: 'student', createdAt: '2024-01-15' },
  { id: '2', name: 'Dr. Sarah Chen', email: 'instructor@kmuni.com', role: 'instructor', createdAt: '2024-01-10' },
  { id: '3', name: 'Admin User', email: 'admin@isquare.com', role: 'admin', createdAt: '2024-01-01' },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const savedToken = localStorage.getItem('kmuni_token');
    const savedUser = localStorage.getItem('kmuni_user');
    if (savedToken && savedUser) {
      try {
        const user = JSON.parse(savedUser) as User;
        dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token: savedToken } });
      } catch {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    } else {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const login = async (credentials: LoginCredentials) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    // TODO: Replace with → const res = await fetch('/api/auth/login', { method:'POST', body: JSON.stringify(credentials) })
    await new Promise(r => setTimeout(r, 800));
    const user = MOCK_USERS.find(u => u.email === credentials.email);
    if (user && credentials.password === 'password123') {
      const token = `mock-jwt-${user.id}`;
      localStorage.setItem('kmuni_token', token);
      localStorage.setItem('kmuni_user', JSON.stringify(user));
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } });
      return { success: true, message: 'Login successful!' };
    }
    dispatch({ type: 'SET_LOADING', payload: false });
    return { success: false, message: 'Invalid email or password.' };
  };

  const signup = async (data: SignupData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    // TODO: Replace with → const res = await fetch('/api/auth/signup', { method:'POST', body: JSON.stringify(data) })
    await new Promise(r => setTimeout(r, 1000));
    if (data.password !== data.confirmPassword) {
      dispatch({ type: 'SET_LOADING', payload: false });
      return { success: false, message: 'Passwords do not match.' };
    }
    const newUser: User = { id: Date.now().toString(), name: data.name, email: data.email, role: data.role, createdAt: new Date().toISOString() };
    const token = `mock-jwt-${newUser.id}`;
    localStorage.setItem('kmuni_token', token);
    localStorage.setItem('kmuni_user', JSON.stringify(newUser));
    dispatch({ type: 'LOGIN_SUCCESS', payload: { user: newUser, token } });
    return { success: true, message: 'Account created successfully!' };
  };

  const logout = () => {
    localStorage.removeItem('kmuni_token');
    localStorage.removeItem('kmuni_user');
    dispatch({ type: 'LOGOUT' });
  };

  const updateUser = (updates: Partial<User>) => {
    if (state.user) {
      const updated = { ...state.user, ...updates };
      localStorage.setItem('kmuni_user', JSON.stringify(updated));
      dispatch({ type: 'UPDATE_USER', payload: updates });
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
