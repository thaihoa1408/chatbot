import { useCallback } from "react";
import { useFetch } from "./useFetch";

const useApiService = () => {
  const fetchService = useFetch();

  const sendMessage = useCallback(
    (endpoint: string, params: any, signal?: AbortSignal) => {
      return fetchService.post<any>(
        endpoint,
        {
          body: params,
          signal,
        },
        signal,
        true
      );
    },
    [fetchService]
  );

  return {
    sendMessage,
  };
};

export default useApiService;
