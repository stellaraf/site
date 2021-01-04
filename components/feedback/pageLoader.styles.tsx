import Head from 'next/head';

export const PageLoaderStyles: React.FC = () => (
  <Head>
    <style>
      {`
  @keyframes spinner {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  div.grid {
      overflow: hidden;
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      width: 100vw;
      background-color: #f0f0f0;
      color: #000;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr;
      gap: 0px 0px;
      grid-template-areas:
        ". . ."
        ". center ."
        ". . .";
      transition: opacity 250ms ease-in-out;
  }
  div.center {
      display: flex;
      grid-area: center;
      align-items: center;
      justify-content: center;
      flex-flow: column nowrap;
  }
  div.grid div.center svg {
      animation: 1s spinner infinite linear;
  }
  @media screen and (max-width: 62em) {
      div.grid div.center svg {
          height: 75%;
          width: 75%;
      }
  }
  @media (prefers-color-scheme: dark) {
      div.grid {
          background: linear-gradient(rgb(41, 21, 214) 0%, rgb(13, 9, 10) 100%);
      }
      div.grid {
          color: #fff;
      }
  }
    `}
    </style>
  </Head>
);
