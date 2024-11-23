"use client";
import { ItemType } from "@/types/types";
import EditForm from '../components/manage/EditForm'
import CreateForm from '../components/manage/CreateForm'
import { useItems } from "../../hooks/useItems";
import Header from "../components/Header";


export default function Manage() {
  // const { items, isLoading, error, mutate } = useItems();
  const { items } = useItems();

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