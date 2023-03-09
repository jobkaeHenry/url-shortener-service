import { getLS, setLS } from "@/utils/localStorage";
import { useState, useEffect } from "react";

export function useLocalStorage(key: string, initialValue: string | null) {
  const [value, setValue] = useState(() => {
    const storedValue = getLS(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    setLS(key, value);
  }, [key, value]);

  return [value, setValue];
}
