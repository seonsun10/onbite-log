import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

// Zustand를 사용하여 전역에서 modal창의 open여부를 확인할 수 있도록 추가
const initailState = {
  isOpen: false,
};

// modal창의 열림 닫힘 액션을 관리하는 Store
const usePostEditorModalStore = create(
  devtools(
    combine(initailState, (set) => ({
      actions: {
        open: () => {
          set({ isOpen: true });
        },
        close: () => {
          set({ isOpen: false });
        },
      },
    })),
    { name: "postEditorModalStore" },
  ),
);

// Open만 구독하여 상태 변경 시 리렌더링 x
export const useOpenPostEditorModal = () => {
  return usePostEditorModalStore((store) => store.actions.open);
};

export const usePostEditorModal = () => {
  const {
    isOpen,
    actions: { open, close },
  } = usePostEditorModalStore();

  return {
    isOpen,
    open,
    close,
  };
};
