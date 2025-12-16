import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { ImageIcon } from "lucide-react";
import { usePostEditorModal } from "@/store/post-editor-modal";
import { useEffect, useRef, useState } from "react";
import { useCreatePost } from "@/hooks/mutations/post/use-create-post";
import { toast } from "sonner";
import { generateErrorMessagee } from "@/lib/error";

export default function PostEditorModal() {
  const { isOpen, close } = usePostEditorModal();

  // 포스트 생성 뮤테이션 호출
  const { mutate: createPost, isPending: isCreatePostPending } = useCreatePost({
    onSuccess: () => {
      close();
    },
    onError: (error) => {
      const msg = generateErrorMessagee(error);
      toast.error(msg, {
        position: "top-center",
      });
    },
  });

  // 포스트 입력 상태를 관리하는 State
  const [content, setContent] = useState("");
  // textarea를 지정하기 위한 useRef
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleCloseModal = () => {
    close();
  };

  const handleCreatePostClick = () => {
    if (content.trim() === "") return;

    createPost(content);
  };

  // useEffect를 사용하여 content를 입력할 때마다 textarea의 높이를 자동 조정
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [content]);

  // Modal창이 열렸을 경우 텍스트 입력 칸에 자동 포커싱
  useEffect(() => {
    if (!isOpen) return;
    textareaRef.current?.focus();
    setContent("");
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseModal}>
      <DialogContent className="max-h-[90vh]">
        <DialogTitle>포스트 작성</DialogTitle>
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="max-h-125 min-h-25 focus:outline-none"
          placeholder="무슨 일이 있었나요?"
        />
        <Button variant={"outline"} className="cursor-pointer">
          <ImageIcon />
          이미지 추가
        </Button>
        <Button
          disabled={isCreatePostPending}
          onClick={handleCreatePostClick}
          className="cursor-pointer"
        >
          저장
        </Button>
      </DialogContent>
    </Dialog>
  );
}
