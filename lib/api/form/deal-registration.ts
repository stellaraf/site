import { isbot } from "isbot";
import type { NextApiRequest } from "next";
import { isValidJsonRequest } from "~/lib";

export async function handleDealRegistrationForm(request: NextApiRequest): Promise<Response> {
  if (!isValidJsonRequest(request)) {
    throw new Error("Invalid request payload");
  }
  if (isbot(request.headers["user-agent"])) {
    throw new Error("You seem like a robot");
  }
  let form = "unknown";
  if (typeof request.url !== "undefined") {
    const [withoutQuery] = request.url.split("?");
    const paths = withoutQuery.split("/");
    form = paths[paths.length - 1];
  }
  const data = request.body;
  console.log(form, data);
  return new Response("neat", { status: 200 });
}
