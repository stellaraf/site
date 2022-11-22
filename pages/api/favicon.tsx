import { ImageResponse, type ImageResponseOptions } from "@vercel/og";

import { faviconDimensions } from "~/lib/server";

import type { NextApiRequest, NextApiResponse } from "next";

type Dimension = number | string | undefined;

function getDimensions(width: number, height: number): [Dimension, Dimension] {
  if (width === height) {
    return [width, height];
  }
  if (width > height) {
    return [undefined, "98%"];
  }
  if (width < height) {
    return ["98%", undefined];
  }
  return [width, height];
}

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (typeof request.url !== "string") {
    return response.send(400);
  }
  const { width, height, mode, alpha } = await faviconDimensions(new URL(request.url));

  let background = mode === "dark" ? "#000" : "#fff";

  if (alpha) {
    background = "transparent";
  }

  const options: ImageResponseOptions = { width, height };

  const image =
    mode === "dark"
      ? "https://res.cloudinary.com/stellaraf/image/upload/v1604277355/stellar-icon-alt-round.svg"
      : "https://res.cloudinary.com/stellaraf/image/upload/v1668264116/stellar-icon-round-gradient.svg";

  const [w, h] = getDimensions(width, height);

  return new ImageResponse(
    (
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
          background,
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
          <img src={image} width={w} height={h} />
        </div>
      </div>
    ),
    options,
  );
}

export const config = {
  runtime: "experimental-edge",
};
