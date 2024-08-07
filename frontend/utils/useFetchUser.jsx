import { useState, useEffect } from 'react';
import  { useAuth } from './AuthContext';

const useFetchUser = () => {
  const {user,setUser} = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:8000/api/v1/users/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Failed to fetch user details: ", errorText);
          throw new Error('Failed to fetch user details');
        }

        const data = await response.json();
        setUser(data.data); 
      } catch (error) {
        console.error('Fetch user error: ', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
};

export default useFetchUser;
