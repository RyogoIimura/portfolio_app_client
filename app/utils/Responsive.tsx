import { css } from "@emotion/react";

import { PROJECT } from '../../data/AppData'

// vw
export const vw = (width: number) => `${100*(width/750)}vw`;

export const Responsive = {
  sp: css`
    @media (min-width: ${PROJECT.BP}px) {
      display: none;
    }
  `,
  pc: css`
    display: none;
    @media (min-width: ${PROJECT.BP}px) {
      display: block;
    }
  `,
}