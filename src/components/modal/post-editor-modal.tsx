import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { ImageIcon, XIcon } from "lucide-react";
import { usePostEditorModal } from "@/store/post-editor-modal";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { useCreatePost } from "@/hooks/mutations/post/use-create-post";
import { toast } from "sonner";
import { generateErrorMessagee } from "@/lib/error";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { useSession } from "@/store/session";

// 이미지 State 타입 정의
type Image = {
  file: File;
  previewUrl: string;
};

export default function PostEditorModal() {
  const session = useSession();
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
  const [images, setImages] = useState<Image[]>([]);

  // textarea를 지정하기 위한 useRef
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCloseModal = () => {
    close();
  };

  // 게시글 생성 이벤트
  const handleCreatePostClick = () => {
    if (content.trim() === "") return;

    createPost({
      content,
      images: images.map((item) => item.file),
      userId: session!.user.id,
    });
  };

  const handleSelectImages = (e: ChangeEvent<HTMLInputElement>) => {
    // 파일이 있는지 검사
    if (e.target.files) {
      // 선택된 이미지를 배열 형태로 저장
      const files = Array.from(e.target.files);

      files.forEach((file) => {
        // 이전에 이미 있는 이미지들이 있다면 붙이기
        setImages((prev) => [
          ...prev,
          { file, previewUrl: URL.createObjectURL(file) }, // URL.createObjectURL을 통해 임시 preview url을 받아올 수 있음
        ]);
      });
    }

    // 입력 값 초기화
    // 값이 그대로 있으면 이벤트가 발생하지 않을 수 있기 때문에 초기화
    e.target.value = "";
  };

  const handleDeleteImage = (image: Image) => {
    // 이미지 삭제 시 클릭한 이미지의 previewUrl을 제외하고 나머지 이미지들을 다시 설정
    setImages((prevImages) =>
      prevImages.filter((item) => item.previewUrl !== image.previewUrl),
    );
  };

  // useEffect를 사용하여 content를 입력할 때마다 textarea의 높이를 자동 조정
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [content]);

  useEffect(() => {
    if (!isOpen) return;
    textareaRef.current?.focus(); // Modal창이 열렸을 경우 텍스트 입력 칸에 자동 포커싱
    setContent(""); // 입력중인 텍스트 제거
    setImages([]); // 창이 닫혔을 떄 이미지 삭제
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
        <input
          onChange={handleSelectImages}
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
        />
        {images.length > 0 && (
          <Carousel>
            <CarouselContent>
              {images.map((image) => (
                <CarouselItem key={image.previewUrl} className="basis-2/5">
                  <div className="relative">
                    <img
                      src={image.previewUrl}
                      className="h-full w-full rounded-sm object-cover"
                    />
                    <div
                      onClick={() => handleDeleteImage(image)}
                      className="absolute top-0 right-0 m-1 cursor-pointer rounded-full bg-black/30 p-1"
                    >
                      <XIcon className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
        <Button
          onClick={() => fileInputRef.current?.click()}
          variant={"outline"}
          className="cursor-pointer"
        >
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
