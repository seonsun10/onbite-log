import { createProfile, fetchProfile } from "@/api/profile";
import { QUERY_KEYS } from "@/lib/constants";
import { useSession } from "@/store/session";
import type { PostgrestError } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";

// 프로필 조회
export function useProfileData(userId?: string) {
  const session = useSession();
  const isMine = userId === session?.user.id;

  return useQuery({
    enabled: !!userId, // 아이디가 있을 때만 조회
    queryFn: async () => {
      // 아이디를 조회했는데 없을 경우 catch로 넘어가서 프로필 등록(자신의 프로필인 경우에만)
      try {
        const profile = await fetchProfile(userId!);
        return profile;
      } catch (error) {
        console.error("Failed to fetch profile data:", error);

        // 프로필 정보가 없을때 반환되는 에러 코드 => PGRST116
        // 비동기 함수이기 때문에 await 사용
        // 자신의 프로필이 없을경우에만 프로필 생성 => 남의 프로필 조회 시 생성x
        if (isMine && (error as PostgrestError).code == "PGRST116") {
          return await createProfile(userId!);
        }
        throw error;
      }
    },
    queryKey: QUERY_KEYS.profile.byId(userId!),
  });
}
