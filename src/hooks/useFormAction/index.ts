"use client";

import { useState, useTransition } from "react";

type ActionResponse = {
  error?: string | null;
  [key: string]: unknown;
};

type UseFormActionOptions<T> = {
  action: (input: T) => Promise<ActionResponse>;
  onSuccess?: (data: ActionResponse) => void;
  onError?: (error: string) => void;
};

export function useFormAction<T>({
  action,
  onSuccess,
  onError,
}: UseFormActionOptions<T>) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const execute = async (input: T) => {
    setError(null);

    startTransition(async () => {
      const result = await action(input);

      if (result.error) {
        setError(result.error);
        onError?.(result.error);
      } else {
        onSuccess?.(result);
      }
    });
  };

  return {
    execute,
    isPending,
    error,
  };
}