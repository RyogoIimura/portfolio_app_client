"use client";
import { css } from "@emotion/react";
import Link from "next/link";

import { PROJECT } from "@/data/AppData";
import { vw } from "../utils/Responsive";

export default function Complete() {
  return (
    <>
      <p css={styles.completeText}>
        ご予約ありがとうございます！
        <br/>ご予約は<Link href='./user' css={styles.userLinkText}>ユーザーページ</Link>よりご確認いただけます。
      </p>
    </>
  );
}

const styles = {
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
    color: ${PROJECT.SUBCOLOR};
    position: relative;

		&::before {
			content: '';
      width: 100%;
      height: 1px;
      background-color: ${PROJECT.SUBCOLOR};
      position: absolute;
      bottom: 0;
      left: 0;
		}

    @media (min-width: ${PROJECT.BP}px) {
      &::before {
        height: 1.5px;
      }
    }
  `,
}
