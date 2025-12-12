import type { Session } from "@supabase/supabase-js";
import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

// 상태를 관리하는 타입 정의
type State = {
  isLoaded: boolean;
  session: Session | null;
};

// 초기 상태 정의
const initialState = {
  isLoaded: false,
  session: null,
} as State; // 타입 단언을 사용 

const useSessionStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        // session을 설정하는 액션함수
        // 로그아웃 시 세션이 없기 때문에 null 추가
        setSession: (session: Session | null) => {
          set({ session, isLoaded: true });
        },
      },
    })),
    {
      name: "sessionStore",
    },
  ),
);

export const useSession = () => {
  const session = useSessionStore((store) => store.session);
  return session;
};

export const useIsSessionLoaded = () => {
  const isSessionLoaded = useSessionStore((store) => store.isLoaded);
  return isSessionLoaded;
};

export const useSetSession = () => {
  const setSession = useSessionStore((Store) => Store.actions.setSession);
  return setSession;
};
