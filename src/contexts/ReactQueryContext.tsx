import { API_ERROR_MESSAGE } from "@/constants/api";
import { PropsWithChildren } from "@/types/propsWithChildren";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";
import { SnackbarContext } from "./SnackbarContext";

export default function ReactQueryClient({ children }: PropsWithChildren) {
  const { openSnackbar } = useContext(SnackbarContext);
  const router = useRouter();

  const handleError = (error: unknown) => {
    if (error instanceof Error) {
      const errorCode = error.message as keyof typeof API_ERROR_MESSAGE;
      const errorMessage =
        API_ERROR_MESSAGE[errorCode] || API_ERROR_MESSAGE.DEFAULT;

      return openSnackbar(errorMessage);
    }
  };

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { refetchOnWindowFocus: false },
    },
    queryCache: new QueryCache({
      onError: (error) => {
        handleError(error);
        router.back();
      },
    }),
    mutationCache: new MutationCache({
      onError: handleError,
    }),
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
