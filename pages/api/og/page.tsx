import { NextRequest } from "next/server";

import { ImageResponse } from "@vercel/og";

const semiBoldFont = fetch(new URL("../../../public/OpenSans-Semibold.ttf", import.meta.url)).then(
  res => res.arrayBuffer(),
);

const lightFont = fetch(new URL("../../../public/OpenSans-Light.ttf", import.meta.url)).then(res =>
  res.arrayBuffer(),
);

const createElement = (title: string, subtitle: string | null) => (
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
        height: "50%",
        color: "white",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          fontSize: 80,
          marginTop: 30,
          lineHeight: 1.4,
          padding: "0 120px",
          whiteSpace: "pre-wrap",
          letterSpacing: "-0.025em",
          fontFamily: '"OpenSans Semibold"',
        }}
      >
        {title}
      </div>
      {typeof subtitle === "string" && (
        <div
          style={{
            fontSize: 40,
            marginTop: 10,
            lineHeight: 1.4,
            padding: "0 120px",
            whiteSpace: "pre-wrap",
            letterSpacing: "-0.025em",
            fontFamily: '"OpenSans Light"',
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
    <div
      style={{
        width: "100%",
        height: "50%",
        display: "flex",
        padding: "100px",
        alignItems: "flex-end",
        justifyItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        width="128px"
        height="128px"
        src="https://res.cloudinary.com/stellaraf/image/upload/v1668266468/stellar-icon-white.svg"
      />
    </div>
  </div>
);

const handler = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);

  const title = searchParams.get("title") ?? "Stellar";
  const subtitle = searchParams.get("subtitle");

  const semiBold = await semiBoldFont;
  const light = await lightFont;

  const element = createElement(title, subtitle);

  return new ImageResponse(element, {
    width: 1200,
    height: 630,
    fonts: [
      { name: "OpenSans Light", data: light, weight: 300, style: "normal" },
      { name: "OpenSans Semibold", data: semiBold, weight: 700, style: "normal" },
    ],
  });
};

export const config = {
  runtime: "experimental-edge",
};

export default handler;
