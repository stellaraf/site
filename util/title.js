import zeitTitle from "title";

export const title = (text, ...rest) =>
  zeitTitle(text, {
    special: [
      "IPv4",
      "IPv6",
      "ASN",
      "RPKI",
      "ROA",
      "IRR",
      "IOS",
      "FRR",
      "ARP",
      "MTU",
      "MAC",
      "ASNs",
      "BGP"
    ],
    ...rest
  });
