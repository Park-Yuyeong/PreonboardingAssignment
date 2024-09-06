import { PropsWithChildren } from "react";
import Toast from "../components/common/Toast";
import useToast from "../store/useToast";

function ToastProvider({ children }: PropsWithChildren) {
  const { toast } = useToast();

  return (
    <>
      {toast && <Toast toast={toast} />}
      {children}
    </>
  );
}

export default ToastProvider;
