import { useState } from "react";

interface UseMutationState<T> {
  isLoading: boolean;
  data?: T;
  error?: unknown;
}

type MutationMethod = "POST" | "PATCH";

type UseMutationResult<T> = [
  (data: any, method: MutationMethod) => void,
  UseMutationState<T>
];

export default function useMutation<T = any>(
  url: string
): UseMutationResult<T> {
  const [state, setState] = useState<UseMutationState<T>>({
    isLoading: false,
    data: undefined,
    error: undefined,
  });
  async function mutate(data: any, method: MutationMethod) {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      const response = await fetch(url, {
        method,
        body: JSON.stringify(data),
        headers: {
          "content-Type": "application/json",
        },
      });
      const json = await response.json();
      setState(prev => ({ ...prev, data: json }));
    } catch (error) {
      setState(prev => ({ ...prev, error: error }));
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }

  return [mutate, { ...state }];
}
