"use client";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";

import { useSession } from "next-auth/react";
import { useUsers } from "@/hooks/useUsers";
import { userType } from "@/types/types";
import { PROJECT } from "@/data/AppData";
import { vw } from "../utils/Responsive";
import { dela_gothic } from "../utils/Fonts";
import { API_URL } from "@/constants/url";

export default function User() {
  const { data: session } = useSession();
  const { users, mutate } = useUsers();

  const [ user, setUser ] = useState<userType | null>(null);
  useEffect(() => {
    if(session){
      users.forEach((e: userType) => {
        if(e.id === session.user?.id) setUser(e);
      })
    }
  }, [session, users])

  const [editFlag, setEditFlag] = useState(false);
  const [editUser, setEditUser] = useState<Omit<userType, "id" | "created_at" | "updated_at" >>({
    name: '',
    email: '',
    tel: undefined,
    post: undefined,
    prefecture: undefined,
    city: undefined,
    address1: undefined,
    address2: undefined
  });
  const handleEdit = () => {
    setEditFlag(!editFlag)
    if(user){
      setEditUser(
        {
          name: user.name,
          email: user.email,
          tel: user.tel,
          post: user.post,
          prefecture: user.prefecture,
          city: user.city,
          address1: user.address1,
          address2: user.address2
        }
      )
    }
  }
  const handleSubmit = async () => {
    if (editFlag) {
      const response = await fetch(`${API_URL}/editUser/${user?.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: user?.id,
          name: editUser.name,
          email: editUser.email,
          tel: editUser.tel,
          post: editUser.post,
          prefecture: editUser.prefecture,
          city: editUser.city,
          address1: editUser.address1,
          address2: editUser.address2,
          created_at: user?.created_at.toString(),
          updated_at: user?.updated_at.toString()
        }),
      });

      if (response.ok) {
        const editedUser = await response.json();
        const updatedUsers = users.map((user: userType) =>
          user.id === editedUser.id ? editedUser : user
        );
        mutate(updatedUsers);
      }
    }

    setEditFlag(!editFlag)
  };

  return (
    <>
      <form
        css={[styles.baseContainer, styles.itemContainer]}
      >
        <div css={styles.baseFlex}>
          <p css={styles.baseText}>名前</p>
          {
            editFlag && user ?
            <input css={[styles.baseText, styles.inputText]} type="text" value={editUser.name} onChange={(e) => setEditUser((prevState) => ({ ...prevState, name: e.target.value}))} /> :
            <p css={styles.baseText}>{user?.name}</p>
          }
        </div>
        <div css={styles.baseFlex}>
          <p css={styles.baseText}>メール</p>
          {
            editFlag && user ?
            <input css={[styles.baseText, styles.inputText]} type="text" value={editUser.email} onChange={(e) => setEditUser((prevState) => ({ ...prevState, email: e.target.value}))} /> :
            <p css={styles.baseText}>{user?.email}</p>
          }
        </div>
        <div css={styles.baseFlex}>
          <p css={styles.baseText}>電話番号</p>
          {
            editFlag && user ?
            <input css={[styles.baseText, styles.inputText]} type="text" value={editUser.tel} onChange={(e) => setEditUser((prevState) => ({ ...prevState, tel: e.target.value}))} /> :
            <p css={styles.baseText}>{user?.tel ? user?.tel : ''}</p>
          }
        </div>
        <div css={styles.baseFlex}>
          <p css={styles.baseText}>郵便番号</p>
          {
            editFlag && user ?
            <input css={[styles.baseText, styles.inputText]} type="text" value={editUser.post} onChange={(e) => setEditUser((prevState) => ({ ...prevState, post: e.target.value}))} /> :
            <p css={styles.baseText}>{user?.post ? user?.post : ''}</p>
          }
        </div>
        <div css={styles.baseFlex}>
          <p css={styles.baseText}>都道府県</p>
          {
            editFlag && user ?
            <input css={[styles.baseText, styles.inputText]} type="text" value={editUser.prefecture} onChange={(e) => setEditUser((prevState) => ({ ...prevState, prefecture: e.target.value}))} /> :
            <p css={styles.baseText}>{user?.prefecture ? user?.prefecture : ''}</p>
          }
        </div>
        <div css={styles.baseFlex}>
          <p css={styles.baseText}>市区町村</p>
          {
            editFlag && user ?
            <input css={[styles.baseText, styles.inputText]} type="text" value={editUser.city} onChange={(e) => setEditUser((prevState) => ({ ...prevState, city: e.target.value}))} /> :
            <p css={styles.baseText}>{user?.city ? user?.city : ''}</p>
          }
        </div>
        <div css={styles.baseFlex}>
          <p css={styles.baseText}>町名・番地</p>
          {
            editFlag && user ?
            <input css={[styles.baseText, styles.inputText]} type="text" value={editUser.address1} onChange={(e) => setEditUser((prevState) => ({ ...prevState, address1: e.target.value}))} /> :
            <p css={styles.baseText}>{user?.address1 ? user?.address1 : ''}</p>
          }
        </div>
        <div css={styles.baseFlex}>
          <p css={styles.baseText}>建物名等</p>
          {
            editFlag && user ?
            <input css={[styles.baseText, styles.inputText]} type="text" value={editUser.address2} onChange={(e) => setEditUser((prevState) => ({ ...prevState, address2: e.target.value}))} /> :
            <p css={styles.baseText}>{user?.address2 ? user?.address2 : ''}</p>
          }
        </div>

        <div css={styles.itemButtonContainer}>
          {
            editFlag && user ?
            <>
              <button
                type="button"
                css={styles.button}
                className={` ${dela_gothic.className}`}
                onClick={() => handleSubmit()}
              >保存</button>
            </> :
            <>
              <button
                type="button"
                css={styles.button}
                className={` ${dela_gothic.className}`}
                onClick={() => handleEdit()}
              >編集</button>
            </>
          }
        </div>
      </form>
    </>
  )
}

const styles = {
  baseContainer: css `
    width: ${vw(650)};
    background-color: #fff;
    padding: ${vw(80)} ${vw(50)};
    margin: 0 auto;

    @media (min-width: ${PROJECT.BP}px) {
      width: 600px;
      padding: 70px 40px 60px;
    }
  `,
  baseFlex: css `
    width: 100%;
    display: flex;
    justify-content: space-between;

    &:not(:first-of-type) {
      margin-top: ${vw(40)};
    }

    @media (min-width: ${PROJECT.BP}px) {
      &:not(:first-of-type) {
        margin-top: 40px;
      }
    }
  `,
  baseText: css `
    font-size: ${vw(24)};
    font-weight: 700;
    width: fit-content;
    white-space: nowrap;

    @media (min-width: ${PROJECT.BP}px) {
      font-size: 20px;
    }
  `,
  inputText: css `
    width: ${vw(380)};

    @media (min-width: ${PROJECT.BP}px) {
      width: 380px;
    }
  `,
  itemContainer: css `
    background-color: ${PROJECT.BGCOLOR};

    &:not(:first-of-type) {
      margin-top: ${vw(40)};
    }

    @media (min-width: ${PROJECT.BP}px) {
      &:not(:first-of-type) {
        margin-top: 40px;
      }
    }
  `,

  itemButtonContainer: css `
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: ${vw(40)};

    @media (min-width: ${PROJECT.BP}px) {
      margin-top: 40px;
    }
  `,
  button: css `
    font-size: ${vw(30)};
    line-height: 1em;
    color: ${PROJECT.SUBCOLOR};
    border-bottom: 2px solid ${PROJECT.SUBCOLOR};

    @media (min-width: ${PROJECT.BP}px) {
      font-size: 30px;
    }
  `,
  rightButton: css `
    margin-left: ${vw(30)};

    @media (min-width: ${PROJECT.BP}px) {
      margin-left: 30px;
    }
  `,
}