import supabase from "@/lib/supabase";

// 새로운 포스트를 등록하는 api
export async function createPost(content: string) {
  const { data, error } = await supabase.from("post").insert({
    content,
  });

  if (error) throw error;

  return data;
}
