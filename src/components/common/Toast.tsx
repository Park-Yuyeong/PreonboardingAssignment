import { cva, VariantProps } from "class-variance-authority";
import { useEffect, useState } from "react";
import { ToastType } from "../../types/modal.type";

const toastVariant = cva(
  "flex justify-center items-center bg-white text-black rounded-lg font-normal transition-transform duration-500 px-4 py-3 text-sm",
  {
    variants: {
      isOpen: {
        true: "translate-y-0",
        false: "-translate-y-full",
      },
      state: {
        alert: "shadow-green-300 shadow-md",
        danger: "shadow-red-400 shadow-md",
      },
    },
    defaultVariants: {
      isOpen: false,
      state: "alert",
    },
  }
);

type ToastVariantProps = VariantProps<typeof toastVariant>;

type ToastProps = {
  toast: ToastType;
} & ToastVariantProps;

const Toast = ({ toast }: ToastProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => setIsOpen(true), 10);
    const closeTimeout = setTimeout(() => setIsOpen(false), 1500 - 300);

    return () => clearTimeout(closeTimeout);
  }, []);

  return (
    <div className="fixed left-0 right-0 z-10 flex justify-center py-4">
      <div className={toastVariant({ isOpen, state: toast.state })}>
        {toast.label}
      </div>
    </div>
  );
};

export default Toast;
