import { API_URL } from "@/constants/url";
import useSWR from "swr";

async function fetcher(key: string) {
  return fetch(key).then((res) => res.json());
}

export const useReservations = () => {
  const { data, isLoading, error, mutate } = useSWR(
    `${API_URL}/getReservations`,
    fetcher
  );

  return {
    reserv: data,
    isLoading,
    error,
    reservMutate: mutate,
  };
};
export const useReservationsItem = () => {
  const { data, isLoading, error, mutate } = useSWR(
    `${API_URL}/getReservationItem`,
    fetcher
  );

  return {
    reservItem: data,
    isLoading,
    error,
    reservItemMutate: mutate,
  };
};