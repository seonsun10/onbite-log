import { useSession } from "@/store/session";
import { Navigate, Outlet } from "react-router";

export default function GuestOnlyLayout() {
    const session = useSession();

    // 세션이 있다면 메인화면으로 이동
    if (session) return <Navigate to={"/"} replace={true} />
    return <Outlet />
}