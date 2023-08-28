import { Link, type LinkProps } from "~/components";
import { useConfig } from "~/context";

import { Dot } from "./dot";
import { useStatus } from "./use-status";

interface StatusProps extends LinkProps {
  status?: boolean;
}

export const Status = (props: StatusProps) => {
  const { status: override, ...rest } = props;
  const { statusUrl } = useConfig();
  const status = useStatus(override);
  return (
    <Link href={statusUrl} isExternal showIcon fontSize={{ base: "xs", lg: "sm" }} {...rest}>
      <Dot status={status} />
      Status
    </Link>
  );
};
