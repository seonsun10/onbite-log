import { useAlertModal } from "@/store/alert-modal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

export default function AlertModal() {
  const store = useAlertModal();

  // 이미 닫혀있다면 끝
  if (!store.isOpen) return null;

  // 어떠한 버튼 이벤트가 있더라도 AlertModal은 닫음
  // 확인 시 포스트 작성 팝업도 닫힘
  // 취소 시 AlertModal만 닫힘

  // 취소 클릭 시
  const handleCancelClick = () => {
    // openAlertModal 호출 시 매개변수로 넘긴 onNegative함수가 있다면 호출
    if (store.onNegative) store.onNegative();

    store.actions.close();
  };

  // 확인 클릭
  const handleActionClick = () => {
    // openAlertModal 호출 시 매개변수로 넘긴 onPositive 있다면 호출
    if (store.onPositive) store.onPositive();

    store.actions.close();
  };

  return (
    <AlertDialog open={store.isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{store.title}</AlertDialogTitle>
          <AlertDialogDescription>{store.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancelClick}>
            취소
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleActionClick}>
            확인
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
