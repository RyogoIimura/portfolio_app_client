"use client";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";

import { useReservations } from "@/hooks/useBooking";
import { useItems } from "@/hooks/useItems";
import { vw } from "../utils/Responsive";
import { PROJECT } from "@/data/AppData";
import { ItemType, ReservationType } from "@/types/types";
import { useSession } from "next-auth/react";
import { dela_gothic } from "../utils/Fonts";
import { API_URL } from "@/constants/url";

export default function BookingForm() {
  const { data: session } = useSession();
  const { reserv, mutate } = useReservations();
  const { items } = useItems();

  const [ reservation, setReservation ] = useState<ReservationType>({
    user_id: '',
    items_list: [{
      name: '',
      count: 0
    }],
    people_cont: 2,
    date: '',
    start_time: ''
  });
  
  const newDate = new Date();
  const nextday = `${newDate.getFullYear()}-${('0'+(newDate.getMonth()+1)).slice(-2)}-${('0'+(newDate.getDate()+1)).slice(-2)}`;
  const [ startTimeArray, setStartTimeArray ] = useState<string[]>([]);
  const startTimeSelect = (date: string) => {
    const array = ['10:00','13:00','16:00'];
    reserv.map((e: ReservationType) => {
      if( e.date === date ){
        array.map((time, index) => {
          if( time === e.start_time ) array.splice(index, 1);
        })
      }
    })
    setStartTimeArray(array)
    setReservation((prevState) => ({
      ...prevState,
      start_time: array[0]
    }));
  }

  useEffect(() => {
    if(session && items && reserv){
      const itemsArray: {name: string, count: number}[] = [];
      items.map((item: ItemType) => {
        itemsArray.push({
          name: item.name,
          count: 0
        })
      });
      setReservation((prevState) => ({
        ...prevState,
        user_id: session.user?.id ? session.user.id : '',
        items_list: itemsArray,
        date: nextday
      }));
      startTimeSelect(nextday)
    }
  }, [session, reserv, items])

  const itemListChange = (value: string, index: number, category: bigint) => {
    const newArray = reservation.items_list;
    newArray[index].count = Number(value);
    setReservation((prevState) => ({
      ...prevState,
      items_list: newArray
    }))
    if( Number(category) == 0 && Number(value) != 0 ) setConfirmFlag(true);
    if( Number(category) == 0 && Number(value) == 0 ) setConfirmFlag(false);
  }

  const [ confirmFlag, setConfirmFlag ] = useState<boolean>(false);
  const [ sendFlag, setSendFlag ] = useState<boolean>(false);
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch(`${API_URL}/createReservations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: reservation.user_id,
        items_list: JSON.stringify(reservation.items_list),
        people_cont: reservation.people_cont,
        date: reservation.date,
        start_time: reservation.start_time
      }),
    });

    if (response.ok) {
      const newReserv = await response.json();
      mutate([...reserv, JSON.parse(newReserv)]);
    }
  }

  return (
    <>
      <form
        css={[styles.baseContainer, styles.itemContainer]}
      >
        <div css={styles.baseFlex}>
          <p css={styles.baseText}>品目</p>
          <div>
            {items?.map((item: ItemType, index: number) => (
              <div key={index}>
                <p>{item.name}</p>
                {
                  Number(item.category) === 0 ? (
                    <select name="count" css={styles.baseText}
                      value={reservation.items_list[index]?.count}
                      onChange={(e) => itemListChange(e.target.value, index, item.category)}
                    >
                      <option value='0'>0</option>
                      <option value="1">1</option>
                    </select>
                  ) : (
                    <select name="count" css={styles.baseText}
                      value={reservation.items_list[index]?.count}
                      onChange={(e) => itemListChange(e.target.value, index, item.category)}
                    >
                      <option value='0'>0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  )
                }
              </div>
            ))}
          </div>
        </div>
        <div css={styles.baseFlex}>
          <p css={styles.baseText}>人数</p>
          <select name="people_cont" css={styles.baseText}
            value={reservation.people_cont}
            onChange={(e) => {
              setReservation((prevState) => ({
                ...prevState,
                people_cont: Number(e.target.value)
              }))
            }}
          >
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div css={styles.baseFlex}>
          <p css={styles.baseText}>日付</p>
          <input type="date" name="date" min={nextday}
            value={reservation.date}
            onChange={(e) => {
              setReservation((prevState) => ({
                ...prevState,
                date: e.target.value
              }))
              startTimeSelect(e.target.value)
            }}
          />
        </div>
        <div css={styles.baseFlex}>
          <p css={styles.baseText}>時間</p>
          <select name="start_time" css={styles.baseText}
            value={reservation.start_time}
            onChange={(e) => {
              setReservation((prevState) => ({
                ...prevState,
                start_time: e.target.value
              }))
            }}
          >
            {startTimeArray.map((time, index) => (
              <option key={index} value={time}>{time}</option>
            ))}
          </select>
        </div>
        <div css={styles.itemButtonContainer}>
          {sendFlag ? (
            <button
              type="button"
              css={styles.button}
              className={`${dela_gothic.className}`}
              onClick={handleSend}
            >送信</button>
          ) : (
            <button
              type="button"
              css={confirmFlag ? styles.button : [styles.button, styles.buttonDisabled]}
              className={`${dela_gothic.className}`}
              onClick={() => setSendFlag(!sendFlag)}
              disabled={confirmFlag ? false : true}
            >確認</button>
          )}
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
  buttonDisabled: css `
    opacity: .5;
  `,
}
