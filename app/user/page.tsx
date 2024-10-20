"use client";
import { css } from "@emotion/react";
import { manrope } from "../utils/Fonts";

import { useSession } from "next-auth/react";
import { useUsers } from "@/hooks/useUsers";
import { userType } from "@/types/types";

export default function User() {
  const { data: session } = useSession();
  const { users, mutate } = useUsers();

  let user: userType;
  if(session){
    users.forEach((e: userType) => {
      if(e.id === session.user?.id) user = e;
    })
  }

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
