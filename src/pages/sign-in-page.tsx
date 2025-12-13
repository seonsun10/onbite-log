import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignInWithPassword } from "@/hooks/mutations/use-sign-in-with-password";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import gitHubLogo from "@/assets/github-mark.svg";
import { useSignInWithOAuth } from "@/hooks/mutations/use-sign-in-withi-oauth";
import { toast } from "sonner";
import { generateErrorMessagee } from "@/lib/error";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { mutate: signInWithPassword, isPending: isSignInWithPasswordPending } =
    useSignInWithPassword({
      onSuccess: () => {
        navigate("/");
      },
      onError: (error) => {
        const message = generateErrorMessagee(error);
        toast.error(message, {
          position: "top-center",
        });
        setPassword("");
      },
    });

  const { mutate: signInWithOAuth, isPending: isSignInWithOAuthPending } =
    useSignInWithOAuth({
      onError: (error) => {
        const message = generateErrorMessagee(error);
        toast.error(message, {
          position: "top-center",
        });
      },
    });

  const handleSignInWithPasswordClick = () => {
    if (email.trim() === "") return;
    if (password.trim() === "") return;

    signInWithPassword({ email, password });
  };

  const handleSignInWithOAuthClick = () => {
    signInWithOAuth("github");
  };

  const isPending = isSignInWithOAuthPending || isSignInWithPasswordPending;

  return (
    <div className="flex flex-col gap-8">
      <div className="text-xl font-bold">로그인</div>
      <div className="flex flex-col gap-2">
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="py-6"
          type="email"
          placeholder="example@abc.com"
          disabled={isPending}
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="py-6"
          type="password"
          placeholder="password"
          disabled={isPending}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Button
          className="w-full cursor-pointer"
          onClick={handleSignInWithPasswordClick}
          disabled={isPending}
        >
          로그인
        </Button>
        <Button
          className="w-full cursor-pointer"
          variant={"outline"}
          onClick={handleSignInWithOAuthClick}
          disabled={isPending}
        >
          <img src={gitHubLogo} className="h-4 w-4" />
          GitHub 계정으로 로그인하기
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        <Link to={"/sign-up"} className="text-muted-foreground hover:underline">
          계정이 없으시다면? 회원가입
        </Link>
        <Link
          to={"/forget-password"}
          className="text-muted-foreground hover:underline"
        >
          비밀번호를 잊으셨나요?
        </Link>
      </div>
    </div>
  );
}
