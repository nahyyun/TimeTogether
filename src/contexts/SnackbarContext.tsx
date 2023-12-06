import { createContext, useState, useRef } from "react";
import Snackbar from "@/components/Common/Snackbar";
import { PropsWithChildren } from "@/types/propsWithChildren";

export const SnackbarContext = createContext({
  isOpen: false,
  message: "",
  openSnackbar: (message: string) => {},
});

export default function SnackbarContextProvider({
  children,
}: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const snackbarTimer = useRef<NodeJS.Timeout>();

  const openSnackbar = (message: string) => {
    if (snackbarTimer.current) {
      clearTimeout(snackbarTimer.current);
    }

    setIsOpen(true);
    setMessage(message);

    snackbarTimer.current = setTimeout(() => {
      setIsOpen(false);
    }, 3000);
  };

  return (
    <SnackbarContext.Provider value={{ isOpen, message, openSnackbar }}>
      <Snackbar />
      {children}
    </SnackbarContext.Provider>
  );
}
