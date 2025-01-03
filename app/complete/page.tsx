"use client";
import { css } from "@emotion/react";
import Link from "next/link";

import { PROJECT } from "@/data/AppData";
import { vw } from "../utils/Responsive";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Header from "../components/Header";

export default function Complete() {
  const { data: session } = useSession();
  const router = useRouter();

  if(session === undefined) router.push("../lp");

  return (
    <div css={styles.completeWrapper}>
      <Header page={'complete'} />
      <p css={styles.completeText}>
        ご予約ありがとうございます！
        <br/>ご予約は<Link href='./user' css={styles.userLinkText}>ユーザーページ</Link>よりご確認いただけます。
      </p>
    </div>
  );
}

const styles = {
  completeWrapper: css `
    padding-bottom: ${vw(180)};

    @media (min-width: ${PROJECT.BP}px) {
      padding-bottom: 130px;
    }
  `,

  completeText: css `
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
