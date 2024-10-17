import { API_URL } from "@/constants/url";
import useSWR from "swr";

async function fetcher(key: string) {
  return fetch(key).then((res) => res.json());
}

export const useUsers = () => {
  const { data, isLoading, error, mutate } = useSWR(
    `${API_URL}/getUsers`,
    fetcher
  );

  return {
    users: data,
    isLoading,
    error,
    mutate,
  };
};
