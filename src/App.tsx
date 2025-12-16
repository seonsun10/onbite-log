import SessionProvider from "./provider/session-provider";
import ModalPorvider from "./provider/modal-provider";
import RootRoute from "./root-route";

export default function App() {
  return (
    <SessionProvider>
      {/* 전역에서 Modal창을 관리할 수 있도록 Provider생성 */}
      <ModalPorvider>
        <RootRoute />
      </ModalPorvider>
    </SessionProvider>
  );
}
