import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { NEXT_URL } from '@/config/index';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // for redirection after login
  const router = useRouter();

  // check if user is logged in using useEffect()
  useEffect(() => checkUserLoggedIn(), []);

  // Register User
  const register = async (user) => {
    // rename for "identifier" for Strapi needs
    const res = await fetch(`${NEXT_URL}/api/register`, {
      // goes to api/login.js
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();

    console.log(data);

    if (res.ok) {
      setUser(data.user); // back from api/login.js
      router.push('/account/dashboard'); // redirect to dashboard
    } else {
      setError(data.message); // back from api/login.js
      setError(null);
    }
  };

  // Login user
  const login = async ({ email: identifier, password }) => {
    // rename for "identifier" for Strapi needs
    const res = await fetch(`${NEXT_URL}/api/login`, {
      // goes to api/login.js
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });

    const data = await res.json();

    console.log(data);

    if (res.ok) {
      setUser(data.user); // back from api/login.js
      router.push('/account/dashboard'); // redirect to dashboard
    } else {
      setError(data.message); // back from api/login.js
      setError(null);
    }
  };

  // Logout user
  const logout = async () => {
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: 'POST',
    });

    if (res.ok) {
      setUser(null);
      router.push('/'); // redirect to home page
    }
  };

  // Check if user is logged in
  const checkUserLoggedIn = async () => {
    const res = await fetch(`${NEXT_URL}/api/user`); // hitting our own API, user.js
    const data = await res.json();

    // we should have user now
    if (res.ok) {
      setUser(data.user);
    } else {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
