export type RequestModel = {
  params?: object;
  headers?: object;
  signal?: AbortSignal;
};

export type RequestWithBodyModel = RequestModel & {
  body?: object | FormData;
};

export const useFetch = () => {
  const handleFetch = async (
    url: string,
    request: any,
    signal?: AbortSignal,
    skipResponseProcessing?: boolean
  ) => {
    const requestUrl = request?.params ? `${url}${request.params}` : url;

    const requestBody = request?.body
      ? request.body instanceof FormData
        ? { ...request, body: request.body }
        : { ...request, body: JSON.stringify(request.body) }
      : request;

    const headers = {
      ...(request?.headers
        ? request.headers
        : request?.body && request.body instanceof FormData
        ? {}
        : { "Content-type": "application/json" }),
    };

    return fetch(requestUrl, { ...requestBody, headers, signal })
      .then((response) => {
        if (!response.ok) throw response;

        if (skipResponseProcessing) {
          return response;
        }

        const contentType = response.headers.get("content-type");
        const contentDisposition = response.headers.get("content-disposition");

        const result =
          contentType &&
          (contentType?.indexOf("application/json") !== -1 ||
            contentType?.indexOf("text/plain") !== -1)
            ? response.json()
            : contentDisposition?.indexOf("attachment") !== -1
            ? response.blob()
            : response;

        return result;
      })
      .catch(async (err) => {
        const contentType = err?.headers?.get("content-type");

        const errResult =
          contentType && contentType?.indexOf("application/problem+json") !== -1
            ? await err.json()
            : err;

        throw errResult;
      });
  };

  return {
    get: async <T>(
      url: string,
      request?: RequestModel,
      signal?: AbortSignal,
      skipResponseProcessing?: boolean
    ): Promise<T> => {
      return handleFetch(
        url,
        { ...request, method: "get" },
        signal,
        skipResponseProcessing
      );
    },
    post: async <T>(
      url: string,
      request?: RequestWithBodyModel,
      signal?: AbortSignal,
      skipResponseProcessing?: boolean
    ): Promise<T> => {
      return handleFetch(
        url,
        { ...request, method: "post" },
        signal,
        skipResponseProcessing
      );
    },
    put: async <T>(
      url: string,
      request?: RequestWithBodyModel,
      signal?: AbortSignal,
      skipResponseProcessing?: boolean
    ): Promise<T> => {
      return handleFetch(
        url,
        { ...request, method: "put" },
        signal,
        skipResponseProcessing
      );
    },
    patch: async <T>(
      url: string,
      request?: RequestWithBodyModel,
      signal?: AbortSignal,
      skipResponseProcessing?: boolean
    ): Promise<T> => {
      return handleFetch(
        url,
        { ...request, method: "patch" },
        signal,
        skipResponseProcessing
      );
    },
    delete: async <T>(
      url: string,
      request?: RequestModel,
      signal?: AbortSignal,
      skipResponseProcessing?: boolean
    ): Promise<T> => {
      return handleFetch(
        url,
        { ...request, method: "delete" },
        signal,
        skipResponseProcessing
      );
    },
  };
};
