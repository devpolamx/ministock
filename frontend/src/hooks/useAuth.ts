// src/hooks/useAuth.ts

import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { login, register, logout, getCurrentUser, clearError } from '../store/slices/authSlice';
import { useErrorHandler } from './useErrorHandler';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, token, isAuthenticated, loading, initializing, error } = useSelector(
    (state: RootState) => state.auth
  );
  const { handleAsyncError } = useErrorHandler();

  const loginWithErrorHandling = async (credentials: { email: string; password: string }) => {
    return handleAsyncError(dispatch(login(credentials)), 'Login');
  };

  const registerWithErrorHandling = async (userData: { name: string; email: string; password: string }) => {
    return handleAsyncError(dispatch(register(userData)), 'Register');
  };

  const logoutWithErrorHandling = async () => {
    return handleAsyncError(dispatch(logout()), 'Logout');
  };

  const getCurrentUserWithErrorHandling = async () => {
    return handleAsyncError(dispatch(getCurrentUser()), 'GetCurrentUser');
  };

  return {
    user,
    token,
    isAuthenticated,
    loading,
    initializing,
    error,
    login: loginWithErrorHandling,
    register: registerWithErrorHandling,
    logout: logoutWithErrorHandling,
    getCurrentUser: getCurrentUserWithErrorHandling,
    clearError: () => dispatch(clearError()),
  };
};