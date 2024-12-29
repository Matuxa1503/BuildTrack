import { useState } from 'react';
import { useEffect } from 'react';

const useFetchItem = (fetchFunc, dependencies = []) => {
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetchFunc();
        setItem(response.data.message);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  return { item, isLoading, error };
};

export default useFetchItem;
