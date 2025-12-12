import supabase from "@/lib/supabase";
import { useEffect, type ReactNode } from "react";
import { useIsSessionLoaded, useSetSession } from "@/store/session";
import GlobalLoader from "@/components/global-loader";

export default function SessionProvider({ children }: { children: ReactNode }) {
  const setSession = useSetSession();
  const isSessionLoaded = useIsSessionLoaded();

  useEffect(() => {
    // Supabase의 인증 상태 변화를 감지하는 이벤트 리스너
    // 로그인, 로그아웃, 토큰 갱신 등의 이벤트가 발생하면 실행됨
    supabase.auth.onAuthStateChange((event, session) => {
      // 변화된 세션 정보를 전역 상태(Zustand)에 업데이트
      setSession(session);
    });
  }, []);

  // 세션 로딩이 완료되지 않았을 경우 로딩 화면을 보여줌
  // 이를 통해 인증 정보가 없는 상태에서 페이지가 깜빡이는 것을 방지
  if (!isSessionLoaded) return <GlobalLoader />;

  // 세션 로딩이 완료되면 실제 자식 컴포넌트들을 렌더링
  return children;
}
