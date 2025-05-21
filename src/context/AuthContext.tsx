
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAdmin: false,
  login: async () => false,
  register: async () => false,
  logout: () => {},
});

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check if user is logged in from localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse user from localStorage', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  // For demonstration purposes, hardcoding a sample admin user
  // In a real app, this would be authenticated against a backend
  const demoUsers = [
    {
      id: '1',
      name: 'Admin User',
      email: 'admin@sssteelindia.com',
      password: 'admin123',
      role: 'admin' as const,
    },
    {
      id: '2',
      name: 'Customer Demo',
      email: 'customer@example.com',
      password: 'customer123',
      role: 'customer' as const,
    },
  ];

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const foundUser = demoUsers.find(
        user => user.email === email && user.password === password
      );

      if (foundUser) {
        const { password, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        toast.success(`Welcome back, ${foundUser.name}!`);
        return true;
      } else {
        toast.error('Invalid email or password');
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred during login');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if email is already in use
      if (demoUsers.some(user => user.email === email)) {
        toast.error('Email is already in use');
        return false;
      }

      // In a real app, this would send data to a backend
      // For demo, we'll just simulate a successful registration
      const newUser = {
        id: `${demoUsers.length + 1}`,
        name,
        email,
        role: 'customer' as const,
      };

      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      toast.success('Registration successful!');
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('An error occurred during registration');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.info('You have been logged out');
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAdmin,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
