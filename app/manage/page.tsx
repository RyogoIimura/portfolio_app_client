"use client";
import { ItemType } from "@/types/types";
import EditForm from '../components/manage/EditForm'
import CreateForm from '../components/manage/CreateForm'
import { useItems } from "../../hooks/useItems";
import { useSession } from "next-auth/react";
import { MANAGE_ID } from "@/constants/url";
import Header from "../components/Header";


export default function Manage() {
  const { data: session } = useSession();
  const { items } = useItems();

  if( session === undefined ) document.location = './lp';
  if( session && session.user?.id != MANAGE_ID ) document.location = './lp';

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