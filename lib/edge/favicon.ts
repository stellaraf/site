interface Query {
  width: number;
  height: number;
  mode: "light" | "dark";
  alpha: boolean;
}

export async function faviconDimensions(url: URL): Promise<Query> {
  const widthStr = url.searchParams.get("w") ?? "64";
  const heightStr = url.searchParams.get("h") ?? "64";
  const modeStr = url.searchParams.get("m") ?? "light";
  const alphaStr = url.searchParams.get("a") ?? "true";

  let width = 64;
  let height = 64;
  let mode: Query["mode"] = "light";
  let alpha: boolean = true;

  if (widthStr.match(/^[0-9]+$/)) {
    width = parseInt(widthStr);
  }

  if (heightStr.match(/^[0-9]+$/)) {
    height = parseInt(heightStr);
  }

  if (modeStr.match(/^(light|dark)$/)) {
    mode = modeStr as Query["mode"];
  }

  if (alphaStr === "true") {
    alpha = true;
  } else if (alphaStr === "false") {
    alpha = false;
  }

  return { width, height, mode, alpha };
}
