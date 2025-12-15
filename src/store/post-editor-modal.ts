import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

const initailState = {
  isOpen: false,
};

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
