"use client";
import { css } from "@emotion/react";

import { PROJECT } from '../../data/AppData'
import { dela_gothic } from "../utils/Fonts";
import { vw } from '../utils/Responsive';

type PageLinksProps = {
  navOpen: () => void;
};

const PageLinks = (props: PageLinksProps) => {
  const { navOpen } = props;
  const linksName = ['CONCEPT', 'FEATURE', 'SAUNA', 'PRICE'];

  return (
    <>
      {linksName.map((value, index) => (
        <div
          key={index}
          className={` ${dela_gothic.className} pageLinkButton`}
          css={styles.pageLink}
          data-num={index}
          onClick={navOpen}
        >
          <span
            css={styles.pageLinkDot}
          >・&nbsp;</span>
          {linksName[index]}
        </div>
      ))}
    </>
  )
};
export default PageLinks;

const styles = {
  pageLink: css `
    font-size: ${vw(38)};
    font-weight: 800;
    letter-spacing: .1em;
    color: #fff;
    margin-top: ${vw(60)};
    text-decoration: none;
    cursor: pointer;

    @media (min-width: ${PROJECT.BP}px) {
    font-size: 25px;
    margin-top: 50px;
  `,
  pageLinkDot: css `
    color: ${PROJECT.SUBCOLOR};
  `,
}
