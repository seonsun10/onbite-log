import SessionProvider from "./provider/session-provider";
import ModalPorvider from "./provider/modal-provider";
import RootRoute from "./root-route";

export default function App() {
  return (
    <SessionProvider>
      <ModalPorvider>
        <RootRoute />
      </ModalPorvider>
    </SessionProvider>
  );
}
