import { css } from "lit";

export const baseStyles = css`
  * {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
  }

  span,
  p,
  td,
  th,
  tr {
    font-size: 16px;
  }

  a {
    color: var(--primary-color);
  }
`;
