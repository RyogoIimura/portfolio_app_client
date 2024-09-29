"use client";
import { manrope } from "../utils/Fonts";
import { css } from "@emotion/react";

export default function User() {
  return (
    <>
      <p
        className={`${manrope.className}`}
        style={{ fontWeight: 400 }}
        css={text}
      >Manrope</p>
      <p
        className={` ${manrope.className}`}
        style={{ fontWeight: 600 }}
      >Manrope</p>
      <p
        className={`${manrope.className}`}
        style={{ fontWeight: 800 }}
      >Manrope</p>
      <p>あいうえお</p>
      <p style={{ fontWeight: 700 }}>あいうえお</p>
    </>
  );
}

const text = css ({
  color: `red`,
})
