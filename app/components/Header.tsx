"use client";
import { css } from "@emotion/react";
import Link from "next/link";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image";

import { PROJECT } from '../../data/AppData'
import { manrope, dela_gothic } from "../utils/Fonts";
import { Responsive } from '../utils/Responsive';
import Navigation from './Navigation';
import { MANAGE_EMAIL } from '../../constants/url';


const Header = () => {
  const [navFlag, setNavFlag] = useState<boolean>(false);
  const navOpen = () => setNavFlag(!navFlag);
  const [userNavFlag, setUserNavFlag] = useState<boolean>(false);
  const userNavOpen = () => setUserNavFlag(!userNavFlag);
  const { data: session } = useSession();

  return (
    <>
      <div
        css={styles.headerContainer}
      >
        <div
          css={styles.headerContContainer}
        >
          <Link
            css={styles.reserveLink}
            href=""
          >▶︎　ご予約はこちらから</Link>
          <Link
            className={` ${manrope.className}`}
            css={[styles.headerTitle, Responsive.pc]}
            href='./lp'
          >AZUMA GORGE SAUNA</Link>
          <div
            css={styles.hamburgerContainer}
          >
            <Link
              className={` ${manrope.className}`}
              css={[styles.headerTitle, Responsive.sp]}
              href='./lp'
            >AZUMA GORGE SAUNA</Link>

            {session ? (
              <div css={[styles.userNavContainer, Responsive.pc]}>
                <button
                  css={styles.userNavButton}
                  onClick={userNavOpen}
                >
                  <Image
                    src={session.user?.image ?? "/images/auth/user_logo.svg"}
                    alt="UserLogo"
                    layout="fill"
                    objectFit="contain"
                  />
                </button>
                <div
                  css={userNavFlag ? (
                    styles.userNav
                  ) : (
                    [styles.userNav, styles.userNavAnime]
                  )}
                >
                  <button
                    className={` ${dela_gothic.className}`}
                    css={[styles.buttonText, styles.userNavText]}
                    onClick={() => signOut()}
                  >SIGN OUT</button>
                  {session.user?.email === MANAGE_EMAIL ? (
                    <Link
                      className={` ${dela_gothic.className}`}
                      css={[styles.buttonText, styles.userNavText]}
                      href="./manage"
                      onClick={userNavOpen}
                    >MANAGE</Link>
                  ) : (
                    <Link
                      className={` ${dela_gothic.className}`}
                      css={[styles.buttonText, styles.userNavText]}
                      href="./user"
                      onClick={userNavOpen}
                    >USER</Link>
                  )}
                </div>
              </div>
            ) : (
              <button
                className={` ${dela_gothic.className}`}
                css={[styles.buttonText, styles.signInButton, Responsive.pc]}
                onClick={() => signIn()}
              >SIGN IN</button>
            )}

            <div
              css={styles.hamburger}
              onClick={navOpen}
            >
              <div
                css={styles.hamburgerLine}
              ></div>
              <div
                css={styles.hamburgerLine}
              ></div>
              <div
                css={styles.hamburgerLine}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <Navigation
        navFlag={navFlag}
        navOpen={navOpen}
      />
    </>
  );
};
export default Header;

const styles = {
  headerContainer: css`
    width: 100%;
    height: 50px;
    background-color: ${PROJECT.KEYCOLOR};
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;

    @media (min-width: ${PROJECT.BP}px) {
      height: 70px;
    }
  `,
  headerContContainer: css`
    width: 100%;
    height: 100%;
    padding-left: 10px;
    display: flex;
    justify-content: space-between;
    position: relative;

    @media (min-width: ${PROJECT.BP}px) {
      padding-left: 30px;
    }
  `,
  reserveLink: css `
    font-size: 9px;
    font-weight: 800;
    color: #fff;
    margin: auto 0;
    text-decoration: none;

    @media (min-width: ${PROJECT.BP}px) {
      font-size: 16px;
    }
  `,

  hamburgerContainer: css `
    width: fit-content;
    height: 100%;
    display: flex;
  `,
  headerTitle: css `
    font-size: 10px;
    font-weight: 800;
    letter-spacing: .05em;
    color: #fff;
    margin: auto 10px auto 0;

    @media (min-width: ${PROJECT.BP}px) {
      font-size: 18px;
      margin: auto 0;
    }
  `,

  buttonText: css `
    font-size: 20px;
    color: #fff;
    letter-spacing: .02em;
    text-wrap: nowrap;
  `,
  signInButton: css `
    display: inline-block;
    margin: auto 30px auto 0;
    text-decoration: none;
    border-bottom: 2px solid #fff;
  `,
  userNavContainer: css `
    width: 50px;
    height: 50px;
    margin: auto 20px auto 0;
    position: relative;
  `,
  userNav: css `
    padding: 20px 26px;
    border-radius: 10px;
    background-color: ${PROJECT.KEYCOLOR};
    position: absolute;
    bottom: -140px;
    left: 50%;
    transform: translateX(-50%);
  `,
  userNavAnime: css `
    display: none;
  `,
  userNavButton: css `
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
  `,
  userNavText: css `
    display: inline-block;
    line-height: 1.8em;
  `,

  hamburger: css`
    width: 50px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;

    @media (min-width: ${PROJECT.BP}px) {
      width: 70px;
    }
  `,
  hamburgerLine: css `
    width: 43%;
    height: 1px;
    background-color: #fff;
    margin: 2px auto;

    @media (min-width: ${PROJECT.BP}px) {
      height: 2px;
      margin: 4px auto;
    }
  `
}
