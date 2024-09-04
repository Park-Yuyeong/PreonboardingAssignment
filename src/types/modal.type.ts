export type ToastType = {
  label: string;
  state?: "alert" | "danger";
};

export type ToastContextType = {
  on: (toast: ToastType) => void;
};
