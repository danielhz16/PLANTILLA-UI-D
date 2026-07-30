import { useLocation, useNavigate } from "react-router"
import { useCallback } from "react";


export const useUrl = () => {
  const location = useLocation();
  const navigate = useNavigate();


  const getValue = useCallback((key: string) => {
    const params = new URLSearchParams(location.search);
    return params.get(key);
  }, [location.search]);



  const getAll = useCallback(() => {
    const params = new URLSearchParams(location.search);
    return Object.fromEntries(params.entries());
  }, [location.search]);


  const setValue = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(location.search);
    params.set(key, value);
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  }, [location.search, location.pathname, navigate]);



  const removeValue = useCallback((key: string) => {
    const params = new URLSearchParams(location.search);
    params.delete(key);
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  }, [location.search, location.pathname, navigate]);


  const getURL = useCallback((url: string) => {
    return `${url}?${new URLSearchParams(location.search).toString()}`;
  }, [location.search]);

  return {
    getValue,
    getAll,
    setValue,
    removeValue,
    getURL,
  };
};  