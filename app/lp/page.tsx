"use client";
import { API_URL } from "@/constants/url";
import { useSession } from "next-auth/react"

export default function Lp() {
  const { data: session } = useSession();

  console.log(session);
  if(session){
    const response = await fetch(`${API_URL}/createUsers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: session.name,
        email: session.email,
      }),
    });
    if (response.ok) {
      const newItem = await response.json();
      mutate([...items, JSON.parse(newItem)]);
    }
  }

  return (
    <>
    </>
  );
}
