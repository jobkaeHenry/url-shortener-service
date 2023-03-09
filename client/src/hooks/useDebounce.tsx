import { useEffect, useState } from "react";

/** value type<T> , value, 지연시간을 인자로 받아 value값을 delay시간 이후 리턴해주는 훅*/
export default function useDebounce<T>(value: T, delay: number = 150) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return debouncedValue;
}
