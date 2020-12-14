import { useState, useEffect, useCallback } from 'react';

export const useAPI = <T>(url: string) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState<T>();
  const [isLoading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/${url}`);
      const data: T = await res.json();

      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return [isLoading, data, error, fetchData] as const;
};
