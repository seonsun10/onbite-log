import { signInWithPassword } from "@/api/auth";
import type { UseMutationCallback } from "@/type";
import { useMutation } from "@tanstack/react-query";

// 입력한 email,pw로 로그인
// 뮤테이션 호출한 곳에서 객체에 email, pw 담아서 넘김
// signInWithPassword 함수에 넘어온 객체 전달
export function useSignInWithPassword(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: signInWithPassword,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks?.onSuccess();
    },
    onError: (error) => {
      console.error(error);

      if (callbacks?.onError) callbacks?.onError(error);
    },
  });
}
