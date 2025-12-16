import { createPost } from "@/api/post";
import type { UseMutationCallback } from "@/type";
import { useMutation } from "@tanstack/react-query";

export function useCreatePost(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: createPost,
    onSuccess: function () {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: function (error) {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
