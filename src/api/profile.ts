import supabase from "@/lib/supabase";
import { getRandomNickname } from "@/lib/utils";

// 프로필 정보 조회
export async function fetchProfile(userId: string) {
  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .eq("id", userId)
    .single();

  // 아이디 없으면 에러 반환됨
  if (error) throw error;

  return data;
}

// 프로필 생성
export async function createProfile(userId: string) {
  // 프로필 생성 후 생성된 프로필 반환
  const { data, error } = await supabase
    .from("profile")
    .insert({
      id: userId,
      nickname: getRandomNickname(),
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}
