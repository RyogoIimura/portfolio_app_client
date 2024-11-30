"use client";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import Link from "next/link";

import { useReservations } from "@/hooks/useBooking";
import { useItems } from "@/hooks/useItems";
import { vw } from "../utils/Responsive";
import { PROJECT } from "@/data/AppData";
import { ItemType, ReservationType, userType } from "@/types/types";
import { useSession } from "next-auth/react";
import { dela_gothic } from "../utils/Fonts";
import { API_URL } from "@/constants/url";
import { useUsers } from "@/hooks/useUsers";
import { useRouter } from 'next/navigation';
import Header from "../components/Header";

export default function BookingForm() {
  const { data: session } = useSession();
  const { reserv, mutate } = useReservations();
  const { items } = useItems();
  const { users } = useUsers();
  const router = useRouter();

  if(session === undefined) router.push("../lp");

  const [ user, setUser ] = useState<userType | null>(null);
  useEffect(() => {
    if(session && users){
      users.map((e: userType) => {
        if(e.id === session.user?.id) setUser(e);
      })
    }
  }, [session, users])

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

    if(array[0]){
      setReservation((prevState) => ({
        ...prevState,
        start_time: array[0]
      }));
      setStartTimeFlag(true)
    } else {
      setStartTimeFlag(false)
    }
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
    if( Number(category) == 0 && Number(value) != 0 ) setSaunaFlag(true);
    if( Number(category) == 0 && Number(value) == 0 ) setSaunaFlag(false);
  }

  const [ saunaFlag, setSaunaFlag ] = useState<boolean>(false);
  const [ startTimeFlag, setStartTimeFlag ] = useState<boolean>(false);
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
      router.push("../complete")
    }
  }

  return (
    <div css={styles.bookingWrapper}>
      <Header page={'booking'} />
      {user?.complete ? (
        <form
          css={[styles.baseContainer, styles.reservContainer]}
        >
          <div css={styles.baseFlex}>
            <p css={styles.baseText}>品目</p>
            <div>
              {items?.map((item: ItemType, index: number) => (
                <div key={index} css={styles.countFlex}>
                  <p css={styles.baseText}>{item.name}&emsp;</p>
                  {sendFlag ? (
                    <p css={styles.baseText}>{reservation.items_list[index]?.count} 個</p>
                  ) : (
                    Number(item.category) === 0 ? (
                      <select name="count" css={styles.baseText}
                        value={reservation.items_list[index]?.count}
                        onChange={(e) => itemListChange(e.target.value, index, item.category)}
                      >
                        <option value='0'>0 個</option>
                        <option value="1">1 個</option>
                      </select>
                    ) : (
                      <select name="count" css={styles.baseText}
                        value={reservation.items_list[index]?.count}
                        onChange={(e) => itemListChange(e.target.value, index, item.category)}
                      >
                        <option value='0'>0 個</option>
                        <option value="1">1 個</option>
                        <option value="2">2 個</option>
                        <option value="3">3 個</option>
                        <option value="4">4 個</option>
                        <option value="5">5 個</option>
                      </select>
                    )
                  )}
                </div>
              ))}
            </div>
          </div>
          <div css={styles.baseFlex}>
            <p css={styles.baseText}>人数</p>
            {sendFlag ? (
              <p css={styles.baseText}>{reservation.people_cont} 人</p>
            ) : (
              <select name="people_cont" css={styles.baseText}
                value={reservation.people_cont}
                onChange={(e) => {
                  setReservation((prevState) => ({
                    ...prevState,
                    people_cont: Number(e.target.value)
                  }))
                }}
              >
                <option value="2">2 人</option>
                <option value="3">3 人</option>
                <option value="4">4 人</option>
                <option value="5">5 人</option>
              </select>
            )}
          </div>
          <div css={styles.baseFlex}>
            <p css={styles.baseText}>日付</p>
            {sendFlag ? (
              <p css={styles.baseText}>{reservation.date}</p>
            ) : (
              <input type="date" name="date" css={styles.baseText}
                min={nextday}
                value={reservation.date}
                onChange={(e) => {
                  setReservation((prevState) => ({
                    ...prevState,
                    date: e.target.value
                  }))
                  startTimeSelect(e.target.value)
                }}
              />
            )}
          </div>
          <div css={styles.baseFlex}>
            <p css={styles.baseText}>時間</p>
            {sendFlag ? (
              <p css={styles.baseText}>{reservation.start_time} ~</p>
            ) : (
              startTimeFlag ? (
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
                  <option key={index} value={time}>{time} ~</option>
                ))}
              </select>
              ) : (
                <p css={styles.baseText}>ご予約できる時間がありません</p>
              )
            )}
          </div>
          {sendFlag ? (
            <p css={styles.annotation}>上記でご予約いたしますので、間違いないかご確認ください</p>
          ) : (
            <p css={styles.annotation}>※ご予約にはテントサウナの選択が必須です</p>
          )}
          <div css={styles.reservButtonContainer}>
            {sendFlag ? (
              <>
                <button
                  type="button"
                  css={styles.button}
                  className={`${dela_gothic.className}`}
                  onClick={() => setSendFlag(!sendFlag)}
                >戻る</button>
                <button
                  type="button"
                  css={[styles.button, styles.rightButton]}
                  className={`${dela_gothic.className}`}
                  onClick={handleSend}
                >送信</button>
              </>
            ) : (
              <button
                type="button"
                css={saunaFlag && startTimeFlag ? styles.button : [styles.button, styles.buttonDisabled]}
                className={`${dela_gothic.className}`}
                onClick={() => setSendFlag(!sendFlag)}
                disabled={saunaFlag && startTimeFlag ? false : true}
              >確認</button>
            )}
          </div>
        </form>
      ) : (
        <p css={styles.requireText}>
          ご予約いただくには<Link href='./user' css={styles.userLinkText}>ユーザーページ</Link>の個人情報欄を<br/>記入いただく必要がございます。
        </p>
      )}
    </div>
  );
}

const styles = {
  bookingWrapper: css `
    padding-bottom: ${vw(180)};

    @media (min-width: ${PROJECT.BP}px) {
      padding-bottom: 130px;
    }
  `,

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
  reservContainer: css `
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

  reservButtonContainer: css `
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
  buttonDisabled: css `
    opacity: .5;
  `,

  countFlex: css `
    display: flex;
    justify-content: space-between;
    &:not(:first-of-type) {
      margin-top: ${vw(24)};
    }

    @media (min-width: ${PROJECT.BP}px) {
      &:not(:first-of-type) {
        margin-top: 24px;
      }
    }
  `,
  annotation: css `
    font-size: ${vw(18)};
    margin-top: ${vw(100)};
    text-align: center;

    @media (min-width: ${PROJECT.BP}px) {
      font-size: 15px;
      margin-top: 100px;
    }
  `,

  requireText: css `
    font-size: ${vw(24)};
    line-height: 2.5em;
    text-align: center;
    letter-spacing: .1em;

    @media (min-width: ${PROJECT.BP}px) {
      font-size: 18px;
    }
  `,
  userLinkText: css `
    font-weight: 700;
    color: ${PROJECT.SUBCOLOR};
    position: relative;

		&::before {
			content: '';
      width: 100%;
      height: 1.5px;
      background-color: ${PROJECT.SUBCOLOR};
      position: absolute;
      bottom: 0;
      left: 0;
		}
  `,
}
