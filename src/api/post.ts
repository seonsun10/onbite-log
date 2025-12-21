import supabase from "@/lib/supabase";
import { uploadImage } from "./image";
import type { PostEntity } from "@/type";

// 포스트 조회
export async function fetchPosts() {
  const { data, error } = await supabase
    .from("post")
    .select("*, author: profile!author_id (*)") // author라는 컬럼에 profile테이블 데이터를 join - author_id를 기준으로
    .order("created_at", { ascending: false }); // 날짜 기준 내림차순

  if (error) throw error;

  return data;
}

// 새로운 포스트를 등록 후 등록된 포스트를 반환하는 api
export async function createPost(content: string) {
  const { data, error } = await supabase
    .from("post")
    .insert({
      content,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function createPostWithImages({
  content,
  images,
  userId,
}: {
  content: string;
  images: File[];
  userId: string;
}) {
  // 1. 새로운 포스트 생성
  const post = await createPost(content);
  if (images.length === 0) return post;

  try {
    // 2. 이미지 업로드
    // 여러개의 이미지에 대한 업로드를 all함수를 통해 병렬처리
    // uploadImage에서는 imageUrl를 반환하여 imageUrls에는 url:string[]이 담김
    const imageUrls = await Promise.all(
      images.map((image) => {
        const fileExtension = image.name.split(".").pop() || "webp";
        const fileName =
          `${Date.now()}-${crypto.randomUUID()}.` + fileExtension;
        const filePath = `${userId}/${post.id}/${fileName}`;
        return uploadImage({ file: image, filePath });
      }),
    );

    // 3. 포스트 테이블 업데이트
    // 생성한 포스트의 image_urls에 업로드한 이미지 경로들을 업데이트
    const updatedPost = updatePost({
      id: post.id,
      image_urls: imageUrls,
    });

    // 성공 시 업데이트한 포스트 정보를 반환
    return updatedPost;
  } catch (error) {
    // 실패하면 포스트 삭제
    // 이 때 이미지가 여러개 등록되다 실패할 경우 앞서 등록된 이미지들의 삭제 과정도 진행해야함
    await deletePost(post.id);
    throw error;
  }
}

// 포스트 업데이트 함수
// post객체를 받지만 선택적 프로퍼티로 정의 하고 ID값을 필수도 받도록 설정
export async function updatePost(post: Partial<PostEntity> & { id: number }) {
  const { data, error } = await supabase
    .from("post")
    .update(post)
    .eq("id", post.id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

// 포스트 삭제
// 삭제 후 삭제된 포스트 정보를 반환
export async function deletePost(id: number) {
  const { data, error } = await supabase
    .from("post")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}
