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
    let createFlag = true;
    users?.map((user: userType) => {
      if( session?.user?.email === user.email ) createFlag = false;
    })
    if( createFlag === true ){
      handleCreateUser();
      console.log(`create`);
    } else {
      console.log(`false`);
    }
  }, [session])

  return (
    <>
    </>
  );
}
