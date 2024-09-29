"use client";
import { useState } from "react";
import { css } from "@emotion/react";

import { PROJECT } from '../../../data/AppData';
import { vw } from '../../utils/Responsive';
import { dela_gothic } from "../../utils/Fonts";
import { useItems } from "../../../hooks/useItems";
import { API_URL } from "@/constants/url";


const CreateForm = () => {
  const { items, isLoading, error, mutate } = useItems();

  const [itemName, setItemName] = useState<string>('');
  const [itemCategory, setItemCategory] = useState<bigint>(BigInt(0));
  const [itemPrice, setItemPrice] = useState<string>('');
  const [itemTemperature, setItemTemperature] = useState<string | undefined>('');
  const [itemCapacity, setItemCapacity] = useState<string | undefined>('');

  const [addFlag, setAddFlag] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch(`${API_URL}/createItem`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: itemName,
        category: itemCategory?.toString(),
        price: itemPrice,
        capacity: itemCapacity,
        maximum_temperature: itemTemperature,
      }),
    });
    console.log(response);

    if (response.ok) {
      const newItem = await response.json();
      mutate([...items, newItem]);
    }

    setAddFlag(!addFlag)
  };

  return (
    <>
      {/* アイテム追加ボタン */}
      <div css={styles.addButtonContainer}>
        <button
          css={[styles.button, styles.addButton]}
          className={` ${dela_gothic.className}`}
          onClick={() => {
            setAddFlag(!addFlag)
          }}
        >追加</button>
      </div>

      {/* モーダル背景 */}
      <div
        css={addFlag ? styles.bg : [styles.bg, styles.bgAnime]}
        onClick={() => setAddFlag(!addFlag)}
      ></div>

      {/* アイテム追加のモーダル */}
      <div
        css={addFlag ? styles.addMdContainer : [styles.addMdContainer, styles.addMdAnime]}
      >
        <form css={styles.baseContainer}>
          <div css={styles.baseFlex}>
            <p css={styles.baseText}>品目</p>
            <input css={styles.baseText} type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} />
          </div>
          <div css={styles.baseFlex}>
            <p css={styles.baseText}>カテゴリー</p>
            <select name="category" css={styles.baseText} value={itemCategory?.toString()} onChange={(e) => setItemCategory(BigInt(e.target.value))}>
              <option value="0">0</option>
              <option value="1">1</option>
            </select>
          </div>
          <div css={styles.baseFlex}>
            <p css={styles.baseText}>値段</p>
            <input css={styles.baseText} type="text" value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} />
          </div>
          <div css={styles.baseFlex}>
            <p css={styles.baseText}>最高温度</p>
            <input css={styles.baseText} type="text" value={itemTemperature} onChange={(e) => setItemTemperature(e.target.value)} />
          </div>
          <div css={styles.baseFlex}>
            <p css={styles.baseText}>収容人数</p>
            <select name="capacity" css={styles.baseText} value={itemCapacity} onChange={(e) => setItemCapacity(e.target.value)}>
              <option value=""></option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </div>
          <div css={styles.addButtonContainer}>
            <button
              type="button"
              css={[styles.button, styles.addButton]}
              className={` ${dela_gothic.className}`}
              onClick={handleSubmit}
            >完了</button>
          </div>
        </form>
      </div>
    </>
  );
};
export default CreateForm;

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

    @media (min-width: ${PROJECT.BP}px) {
      font-size: 20px;
    }
  `,
  inputText: css `
    border: 2px solid ${PROJECT.BGCOLOR}
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
  addButtonContainer: css `
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: ${vw(60)};

    @media (min-width: ${PROJECT.BP}px) {
      margin-top: 60px;
    }
  `,
  addButton: css `
    color: ${PROJECT.KEYCOLOR};
    border-bottom: 2px solid ${PROJECT.KEYCOLOR};
  `,

  bg: css `
    width: 100vw;
    height: 100vh;
    background-color: #000;
    opacity: .5;
    position: fixed;
    z-index: 105;
    top: 0;
    left: 0;
  `,
  bgAnime: css `
    display: none;
  `,
  addMdContainer: css `
    width: ${vw(650)};
    position: fixed;
    z-index: 110;
    top: 50vh;
    left: 50vw;
    transform: translate(-50%,-50%);

    @media (min-width: ${PROJECT.BP}px) {
      width: 600px;
    }
  `,
  addMdAnime: css `
    display: none;
  `,
}
