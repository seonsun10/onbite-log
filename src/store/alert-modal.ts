import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

// 열려 있을 때에는 표시할 제목과 설명, 열림과 닫힘 이벤트 시 발생시킬 함수 받기
type OpenState = {
  isOpen: true;
  title: string;
  description: string;
  onPositive?: () => void;
  onNegative?: () => void;
};

// 닫힘상태일 때에는 나머지 변수들이 필요 없음(출력이 안되기 때문)
type CloseState = {
  isOpen: false;
};

type State = CloseState | OpenState;

const initialState = {
  isOpen: false,
} as State;

const useAlertModalStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        // Omit으로 열림변수는 안가져옴
        open: (params: Omit<OpenState, "isOpen">) => {
          set({ ...params, isOpen: true });
        },
        close: () => {
          set({ isOpen: false });
        },
      },
    })),
    { name: "AlertModalStore" },
  ),
);

export const useOpenAlertModal = () => {
  const open = useAlertModalStore((store) => store.actions.open);
  return open;
};

export const useAlertModal = () => {
  const store = useAlertModalStore();
  return store as typeof store & State;
};
