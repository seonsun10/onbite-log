import { type Database } from "@/database.types";

export type PostEntity = Database["public"]["Tables"]["post"]["Row"];

// 공통으로 사용할 mutation의 callback 함수 타입 정의
export type UseMutationCallback = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  onMutate?: () => void;
  onSettled?: () => void;
};
