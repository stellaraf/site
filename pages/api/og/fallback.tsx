import { ImageResponse } from "@vercel/og";

const element = (
  <div
    style={{
      width: "100%",
      height: "100%",
      display: "flex",
      flexWrap: "nowrap",
      textAlign: "center",
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "center",
      background: "linear-gradient(0deg, rgba(41,21,214,1) 0%, rgba(145,0,250,1) 100%)",
    }}
  >
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        width="800px"
        src="https://res.cloudinary.com/stellaraf/image/upload/v1668267126/stellar-logo-white.svg"
      />
    </div>
  </div>
);

const options = {
  width: 1200,
  height: 630,
};

export const config = {
  runtime: "edge",
};

export default () => new ImageResponse(element, options);
