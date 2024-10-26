"use client";
import { useSession } from "next-auth/react"
import { useEffect } from "react";

import { API_URL } from "@/constants/url";
import { useUsers } from "../../hooks/useUsers";
import { userType } from "@/types/types";

export default function Lp() {
  const { data: session } = useSession();
  const { users, mutate } = useUsers();

  const handleCreateUser = async () => {
    const response = await fetch(`${API_URL}/createUser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: session?.user?.id,
        name: session?.user?.name,
        email: session?.user?.email,
      }),
    });

    if (response.ok) {
      const newUser = await response.json();
      mutate([...users, newUser]);
    }
  };

  useEffect(() => {
    if(session){
      let createFlag = true;
      users?.map((user: userType) => {
        if( session?.user?.id === user.id ) createFlag = false;
      })
      if( createFlag === true ) handleCreateUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, users])

  return (
    <>
    </>
  );
}
