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
import { MANAGE_ID } from '../../constants/url';
import { navCloseFunc, navOpenFunc, userNavCloseFunc, userNavOpenFunc } from "../utils/nav/gsapAnimation";


const Header = () => {
  const { data: session } = useSession();
  const [navFlag, setNavFlag] = useState<boolean>(false);
  const navOpen = () => {
    setNavFlag(!navFlag);
    if(navFlag === false ) navOpenFunc();
    else navCloseFunc();
  };
  const [userNavFlag, setUserNavFlag] = useState<boolean>(false);
  const userNavOpen = () => {
    setUserNavFlag(!userNavFlag)
    if(userNavFlag === false ) userNavOpenFunc();
    else userNavCloseFunc();
  };

  return (
    <>
      <div
        css={styles.headerContainer}
        id='header'
      >
        <div
          css={styles.headerContContainer}
        >
          {
            session ? (
              <Link
                css={styles.reserveLink}
                href='./booking'
              >▶︎　ご予約はこちらから</Link>
            ) : (
              <div
                css={styles.reserveLink}
                onClick={() => signIn()}
              >▶︎　ログイン後ご予約できます</div>
            )
          }
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
                    fill
                    style={{ objectFit: 'contain'}}
                  />
                </button>
                <div css={styles.userNav}>
                  <div
                    id='userNavCont'
                    css={styles.userNavCont}
                  >
                    <button
                      className={` ${dela_gothic.className}`}
                      css={[styles.buttonText, styles.userNavText]}
                      onClick={() => signOut()}
                    >SIGN OUT</button>
                    {session.user?.id === MANAGE_ID ? (
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

      <Navigation navOpen={navOpen} />
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
    opacity: 0;

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
    cursor: pointer;

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
    position: absolute;
    bottom: -140px;
    left: 50%;
    transform: translateX(-50%);
  `,
  userNavCont: css `
    padding: 20px 26px;
    border-radius: 10px;
    background-color: ${PROJECT.KEYCOLOR};
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
