import supabase from "@/lib/supabase";
import type { Provider } from "@supabase/supabase-js";

// 회원가입
export async function signUp({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) throw error;

  return data;
}

// 로그인 요청
// email, pw 객체로 받음
export async function signInWithPassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  return data;
}

// OAuth 로그인 요청(GitHub)
export async function signInWithOAuth(provider: Provider) {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
  });

  if (error) throw error;

  return data;
}

// 인증메일 요청
export async function requestPaswordResetEmail(email: string) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${import.meta.env.VITE_PUBLIC_URL}/reset-password`,
  });

  if (error) throw error;

  return data;
}

// 비밀번호 재설정
export async function updatePassword(password: string) {
  const { data, error } = await supabase.auth.updateUser({
    password,
  });

  if (error) throw error;

  return data;
}
