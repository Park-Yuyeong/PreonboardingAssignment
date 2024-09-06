import { PropsWithChildren } from "react";
import Modal from "../components/common/Modal";
import useModal from "../store/useModal";

function ModalProvider({ children }: PropsWithChildren) {
  const { modal } = useModal();

  return (
    <>
      {modal && <Modal modal={modal} />}
      {children}
    </>
  );
}

export default ModalProvider;
