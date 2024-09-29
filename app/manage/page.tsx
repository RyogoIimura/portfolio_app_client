"use client";
import { css } from "@emotion/react";

import { PROJECT } from '../../data/AppData';
import { vw } from '../utils/Responsive';
import { ItemType } from "@/types/types";
import EditForm from '../components/manage/EditForm'
import CreateForm from '../components/manage/CreateForm'
import { useItems } from "../../hooks/useItems";


export default function Manage() {
  const { items, isLoading, error, mutate } = useItems();

  return (
    <>
      <div css={styles.manageWrapper}>

        {/* アイテム一覧 */}
        {items?.map((item: ItemType) => (
          <EditForm
            key={item.id}
            item={item}
          />
        ))}

        {/* アイテム追加 */}
        <CreateForm />
      </div>
    </>
  );
}

const styles = {
  manageWrapper: css `
    margin: ${vw(140)} auto 0;

    @media (min-width: ${PROJECT.BP}px) {
      margin: 120px auto 0;
    }
  `,
}
