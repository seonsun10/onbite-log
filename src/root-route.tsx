import { Navigate, Route, Routes } from "react-router";
import SignInPage from "./pages/sign-in-page";
import SignUpPage from "./pages/sign-up-page";
import ForgetPasswordPage from "./pages/forget-password-page";
import IndexPage from "./pages/index-page";
import PostDetailPage from "./pages/post-detail-page";
import ProfileDetailPage from "./pages/profile-detail-page";
import ResetPasswordPage from "./pages/reset-password-page";
import GlobalLayout from "./components/layout/global-layout";
import GuestOnlyLayout from "./components/layout/guest-only-layout";

export default function RootRoute() {
  return (
    <Routes>
      <Route element={<GlobalLayout />}>
        {/* 비로그인 상태 */}
        <Route element={<GuestOnlyLayout />}>
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/forget-password" element={<ForgetPasswordPage />} />
        </Route>

        {/* 로그인 상태 */}
        <Route>
          <Route path="/" element={<IndexPage />} />
          <Route path="/post/:postId" element={<PostDetailPage />} />
          <Route path="/profile/:userId" element={<ProfileDetailPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Route>
        {/* 기타 */}
        <Route path="*" element={<Navigate to={"/"} />} />
      </Route>
    </Routes>
  );
}
