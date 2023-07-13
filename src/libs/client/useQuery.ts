import { useEffect, useState } from "react";

interface UseUserState<T> {
  isLoading: boolean;
  data?: T;
  error?: unknown;
}

export default function useQuery<T>(url: string) {
  const [state, setState] = useState<UseUserState<T>>({
    isLoading: false,
    data: undefined,
    error: undefined,
  });

  useEffect(() => {
    (async () => {
      try {
        setState((prev) => ({ ...prev, isLoading: true }));
        const response = await (await fetch(url)).json();
        setState((prev) => ({ ...prev, data: response, isLoading: false }));
      } catch (error) {
        setState((prev) => ({ ...prev, error, isLoading: false }));
      }
    })();
  }, [url]);

  return { ...state };
}
