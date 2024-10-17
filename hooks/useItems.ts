import { API_URL } from "@/constants/url";
import useSWR from "swr";

async function fetcher(key: string) {
  return fetch(key).then((res) => res.json());
}

export const useItems = () => {
  const { data, isLoading, error, mutate } = useSWR(
    `${API_URL}/getItems`,
    fetcher
  );

  return {
    items: data,
    isLoading,
    error,
    mutate,
  };
};
