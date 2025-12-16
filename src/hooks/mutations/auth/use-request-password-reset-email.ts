import { requestPaswordResetEmail } from "@/api/auth";
import type { UseMutationCallback } from "@/type";
import { useMutation } from "@tanstack/react-query";

export function useRequestPasswordResetEmail(callbacks: UseMutationCallback) {
  return useMutation({
    mutationFn: requestPaswordResetEmail,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
