import { UAParser } from "ua-parser-js";

import { all, is } from "~/lib";

import type { UserData } from "./types";
import type { IncomingHttpHeaders } from "http";
import type { NextApiRequest } from "next";

export function parseUserAgent(request: NextApiRequest): UserData {
  const userAgent = request.headers["user-agent"];
  const parser = new UAParser(userAgent);
  const { browser, device, os } = parser.getResult();
  const userData: UserData = {};
  if (is(browser)) {
    // Add browser information if it exists.
    userData.Browser = `${browser.name} ${browser.version}`;
  }
  if (is(device.vendor)) {
    // Add device information if it exists.
    userData.Device = `${device.vendor} ${device.model} ${device.type}`;
  }
  if (is(os.name)) {
    // Add OS information if it exists.
    userData.OS = `${os.name} ${os.version}`;
  }
  if (!all(...["Browser", "Device", "OS"].map(k => Object.keys(userData).includes(k)))) {
    // If the browser, device, or OS aren't able to be parsed, provide the raw User Agent string.
    userData["User Agent"] = userAgent;
  }
  return userData;
}

export function formNameFromHeaders(headers: IncomingHttpHeaders): string {
  const _default = "unknown";
  const formName = headers["x-form-name"] ?? _default;
  if (Array.isArray(formName)) {
    if (formName.length !== 0) {
      const name = formName[0];
      if (name !== "") {
        return name;
      }
    }
    return _default;
  }
  return formName;
}
