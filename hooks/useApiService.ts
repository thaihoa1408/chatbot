import { useCallback } from "react";
import { useFetch } from "./useFetch";
import { getChatEndpoint } from "@/utils";
const useApiService = () => {
  const fetchService = useFetch();

  const sendMessage = useCallback(
    (params: any, signal?: AbortSignal) => {
      const { chatSettings } = params;
      const endpoint = getChatEndpoint(chatSettings.model);
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
