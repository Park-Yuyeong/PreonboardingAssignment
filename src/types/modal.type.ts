export type ToastType = {
  label: string;
  state?: "alert" | "danger";
};

export type ToastStoreType = {
  toast: ToastType | null;
  setToast: (toast: ToastType) => void;
};

export type ModalType = {
  label: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmButtonContent: string;
  cancelButtonContent: string;
};

export type ModalStoreType = {
  modal: ModalType | null;
  open: (modal: ModalType) => void;
  close: () => void;
};
