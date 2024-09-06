import { useEffect } from "react";
import { ModalType } from "../../types/modal.type";
import Button from "./Button";

type ModalProps = {
  modal: ModalType;
};

const Modal = ({ modal }: ModalProps) => {
  const {
    label,
    onConfirm,
    onCancel,
    confirmButtonContent,
    cancelButtonContent,
  } = modal;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-20 flex justify-center items-center backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center border-4 border-white rounded-2xl px-6 py-6 gap-y-4">
        <p className="font-medium text-lg">{label}</p>
        <div className="flex items-start gap-x-2">
          <Button onClick={onConfirm}>{confirmButtonContent}</Button>
          <Button onClick={onCancel} priority={"secondary"}>
            {cancelButtonContent}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
