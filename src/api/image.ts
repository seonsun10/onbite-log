import { BUCKET_NAME } from "@/lib/constants";
import supabase from "@/lib/supabase";

// BUCKET에 이미지 업로드
export async function uploadImage({
  file,
  filePath,
}: {
  file: File;
  filePath: string;
}) {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME) // supabase에서 생성한 bucket의 이름
    .update(filePath, file);
    // bucket의 filePath경로에 file을 업로드

  if (error) throw error;

  // 저장된 이미지에 접근이 가능한 url을 반환해줌
  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET_NAME).getPublicUrl(data.path);

  return publicUrl;
}
