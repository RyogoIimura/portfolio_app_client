"use client";
import { css } from "@emotion/react";
import Image from "next/image";

import { PROJECT } from '../../data/AppData'
import { manrope, dela_gothic } from "../utils/Fonts";
import { vw, Responsive } from '../utils/Responsive';

const Footer = () => {

  return (
    <>
      <div
        css={styles.footerContainer}
      >
        <Image src="/images/footer/footer_sp.jpg" alt="Footer Img" fill style={{ objectFit: 'contain'}} css={Responsive.sp} />
        <Image src="/images/footer/footer_pc.jpg" alt="Footer Img" fill style={{ objectFit: 'contain'}} css={Responsive.pc} />
        <div
          css={styles.textWrapper}
        >
          <p
            className={`${manrope.className}`}
            css={styles.subTitle}
          >RIVERSIDE SAUNA RENTAL</p>
          <h2
            className={`${dela_gothic.className}`}
            css={styles.title}
          >THE AZUMA<br/>GORGE SAUNA</h2>
        </div>
      </div>
    </>
  );
};

export default Footer;

const styles = {
  footerContainer: css`
    width: 100vw;
    height: ${vw(600)};
    position: relative;
    margin-top: ${vw(180)};

    @media (min-width: ${PROJECT.BP}px) {
      height: 47vw;
      margin-top: 130px;
    }
  `,

  textWrapper: css `
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
  `,
  subTitle: css`
    font-size: ${vw(16)};
    font-weight: 600;
    letter-spacing: .05em;
    text-align: center;
    color: ${PROJECT.SUBCOLOR};

    @media (min-width: ${PROJECT.BP}px) {
      font-size: 18px;

      @media (max-width: 920px) {
        font-size: calc(100vw * (18/920));
      }
    }
  `,
  title: css`
    font-size: ${vw(38)};
    line-height: 1.4em;
    letter-spacing: .04em;
    text-align: center;
    color: #fff;
    padding-bottom: ${vw(40)};

    @media (min-width: ${PROJECT.BP}px) {
      font-size: 42px;
      padding-bottom: 40px;

      @media (max-width: 920px) {
        font-size: calc(100vw * (42/920));
        padding-bottom: calc(100vw * (40/920));
      }
    }
  `,
}