"use client";
import { ItemType } from "@/types/types";
import { useItems } from "../../hooks/useItems";
import { useSession } from "next-auth/react";
import { MANAGE_ID } from "@/constants/url";
import { useRouter } from 'next/navigation';
import EditForm from '../components/manage/EditForm'
import CreateForm from '../components/manage/CreateForm'
import Header from "../components/Header";

export default function Manage() {
  const { data: session } = useSession();
  const { items } = useItems();
  const router = useRouter();

  if( session === undefined || session?.user?.id != MANAGE_ID ) router.push("../lp");

  return (
    <>
      <Header page={'manage'} />
      <div>

        {items?.map((item: ItemType) => (
          <EditForm
            key={item.id}
            item={item}
          />
        ))}

        <CreateForm />
      </div>
    </>
  );
}