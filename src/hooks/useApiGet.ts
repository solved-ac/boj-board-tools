import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import isEqual from "react-fast-compare";

export type GetState<T> =
  | { loaded: false; error: boolean; data?: T }
  | { loaded: true; error: true; data?: T; errorMessage: string }
  | { loaded: true; error: false; data: T };

const useApiGet = <T = any>(
  url: string,
  params?: AxiosRequestConfig | undefined
) => {
  const [stateUrl, setStateUrl] = useState<string>(url);
  const [stateParams, setStateParams] = useState<
    AxiosRequestConfig | undefined
  >(params);
  const [state, setState] = useState<GetState<T>>({
    loaded: false,
    error: false,
  });

  useEffect(() => {
    if (url !== stateUrl) setStateUrl(url);
  }, [url, stateUrl]);

  useEffect(() => {
    if (!isEqual(params, stateParams)) setStateParams(params);
  }, [params, stateParams]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const token = source.token;
    setState({ loaded: false, error: false });
    axios
      .get<T>(stateUrl, { ...stateParams, cancelToken: token })
      .then((res) => setState({ loaded: true, error: false, data: res.data }))
      .catch((err) =>
        setState({
          loaded: true,
          error: true,
          errorMessage: axios.isAxiosError(err) ? err.message : err.toString(),
        })
      );
    return () => {
      source.cancel("Operation canceled by url change.");
    };
  }, [stateUrl, stateParams]);

  return state;
};

export default useApiGet;
