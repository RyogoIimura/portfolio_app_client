"use client";
import { css } from "@emotion/react";

import { useReservations } from "@/hooks/useBooking";
import { vw } from "../utils/Responsive";
import { PROJECT } from "@/data/AppData";

export default function BookingForm() {
  const { reserv, mutate } = useReservations();
  console.log(reserv, mutate);

  // const [editFlag, setEditFlag] = useState(false);

  // const handleCreate = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   const response = await fetch(`${API_URL}/createItem`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       name: itemName,
  //       category: itemCategory?.toString(),
  //       price: itemPrice,
  //       capacity: itemCapacity,
  //       maximum_temperature: itemTemperature,
  //     }),
  //   });

  //   if (response.ok) {
  //     const newItem = await response.json();
  //     mutate([...items, JSON.parse(newItem)]);
  //   }

  //   addMdOpen();
  // };

  return (
    <>
      <form
        css={[styles.baseContainer, styles.itemContainer]}
      >
        <div css={styles.baseFlex}>
          <p css={styles.baseText}>品目</p>
          {/* {
            editFlag && editItemId === item.id ?
            <input css={[styles.baseText, styles.inputText]} type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} /> :
            <p css={styles.baseText}>{item.name}</p>
          } */}
        </div>
      </form>
    </>
  );
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
