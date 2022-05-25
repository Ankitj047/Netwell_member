import { css } from '@emotion/core'

const globals = css`
  body {
    width: 100%;
    overflow-x: hidden;
    background: rgb(234, 232, 219);
    overflow-y: auto;
  }

  @media print {
    body {
      // background: yellow;
    }
  }

  a {
    color: inherit;
    text-decoration: none;

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }

  img {
    max-width: 100%;
    position: relative;
    vertical-align: middle;
  }

  figure {
    margin: 2rem 0;
  }

  figcaption {
    font-size: 80%;
  }

  table {
    width: 100%;
    font-size: 85%;
    border-collapse: collapse;
  }

  .modal-backdrop{
    z-index: 1900;
  }
  .modal{
    z-index: 2000;
  }
`

export default globals
