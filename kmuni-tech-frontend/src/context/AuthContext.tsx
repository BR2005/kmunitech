import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { User, AuthState, LoginCredentials, SignupData } from '../types';
import { fetchCurrentUser, loginUser, signupUser } from '../utils/api';

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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const savedToken = localStorage.getItem('kmuni_token');
    const bootstrap = async () => {
      if (savedToken) {
        try {
          const user = await fetchCurrentUser(savedToken);
          localStorage.setItem('kmuni_user', JSON.stringify(user));
          dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token: savedToken } });
          return;
        } catch (error) {
          console.warn('Failed to restore session', error);
          localStorage.removeItem('kmuni_token');
          localStorage.removeItem('kmuni_user');
        }
      }
      dispatch({ type: 'SET_LOADING', payload: false });
    };
    bootstrap();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const res = await loginUser(credentials);
      if (!res.success || !res.user || !res.token) {
        dispatch({ type: 'SET_LOADING', payload: false });
        return { success: false, message: res.message || 'Invalid email or password.' };
      }
      localStorage.setItem('kmuni_token', res.token);
      localStorage.setItem('kmuni_user', JSON.stringify(res.user));
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user: res.user, token: res.token } });
      return { success: true, message: res.message || 'Login successful!' };
    } catch (error: any) {
      dispatch({ type: 'SET_LOADING', payload: false });
      return { success: false, message: error?.message || 'Login failed. Please try again.' };
    }
  };

  const signup = async (data: SignupData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const res = await signupUser(data);
      if (!res.success || !res.user || !res.token) {
        dispatch({ type: 'SET_LOADING', payload: false });
        return { success: false, message: res.message || 'Signup failed.' };
      }
      localStorage.setItem('kmuni_token', res.token);
      localStorage.setItem('kmuni_user', JSON.stringify(res.user));
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user: res.user, token: res.token } });
      return { success: true, message: res.message || 'Account created successfully!' };
    } catch (error: any) {
      dispatch({ type: 'SET_LOADING', payload: false });
      return { success: false, message: error?.message || 'Signup failed. Please try again.' };
    }
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
