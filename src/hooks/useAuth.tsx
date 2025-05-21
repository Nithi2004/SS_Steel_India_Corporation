
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const loginAndRedirect = async (email: string, password: string, redirectPath?: string) => {
    const success = await context.login(email, password);
    if (success) {
      const destination = context.isAdmin ? '/admin/dashboard' : (redirectPath || '/');
      navigate(destination);
      return true;
    }
    return false;
  };

  const registerAndRedirect = async (name: string, email: string, password: string) => {
    const success = await context.register(name, email, password);
    if (success) {
      navigate('/');
      return true;
    }
    return false;
  };

  return {
    ...context,
    loginAndRedirect,
    registerAndRedirect,
  };
};
