"use client";
import { css } from "@emotion/react";

import { manrope } from "../utils/Fonts";
import { useUsers } from "@/hooks/useUsers";
import { useSession } from "next-auth/react";
import { API_URL } from "@/constants/url";

export default function User() {
  const { data: session } = useSession();
  const { users, mutate } = useUsers();

  const handleGetUser = async () => {
    if(session){
      const response = await fetch(`${API_URL}/getUser/${session.user?.id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });

      if (response.ok) {
        console.log(response);
      }
    }
  };
  handleGetUser();

  return (
    <>
      <p
        className={`${manrope.className}`}
        style={{ fontWeight: 400 }}
        css={text}
      >Manrope</p>
      <p
        className={` ${manrope.className}`}
        style={{ fontWeight: 600 }}
      >Manrope</p>
      <p
        className={`${manrope.className}`}
        style={{ fontWeight: 800 }}
      >Manrope</p>
      <p>あいうえお</p>
      <p style={{ fontWeight: 700 }}>あいうえお</p>
    </>
  );
}

const text = css ({
  color: `red`,
})
