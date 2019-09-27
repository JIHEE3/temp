import { useState, useEffect } from 'react';

/**
 *
 * @param {function} func
 * @param {} conditions
 * @return {JOSN} { data, isLoading, error }
 */
export function useFetch(func, conditions = []) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  const fetch = () => {
    func()
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
        setError(true);
      });
  };

  useEffect(fetch, conditions);

  const isLoading = data == null;
  return { data, isLoading, error };
}
