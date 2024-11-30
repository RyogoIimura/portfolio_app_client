"use client";
import { css } from "@emotion/react";
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";

import { ItemType } from "@/types/types";
import { useItems } from "../../hooks/useItems";
import { MANAGE_ID } from "@/constants/url";
import { vw } from "../utils/Responsive";
import { PROJECT } from "@/data/AppData";
import EditForm from '../components/manage/EditForm'
import CreateForm from '../components/manage/CreateForm'
import Header from "../components/Header";

export default function Manage() {
  const { data: session } = useSession();
  const { items } = useItems();
  const router = useRouter();

  if( session === undefined || session?.user?.id != MANAGE_ID ) router.push("../lp");

  return (
    <div css={styles.manageWrapper}>
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
    </div>
  );
}

const styles = {
  manageWrapper: css `
    padding-bottom: ${vw(180)};

    @media (min-width: ${PROJECT.BP}px) {
      padding-bottom: 130px;
    }
  `
}