import { Button, Link, type ButtonProps, type LinkProps } from "~/components";
import { useConfig } from "~/context";

import { Dot } from "./dot";
import { useStatus } from "./use-status";

interface StatusProps extends Omit<LinkProps, "size"> {
  status?: boolean;
  size?: LinkProps["boxSize"];
}

interface StatusButtonProps extends Omit<ButtonProps, "size"> {
  status?: boolean;
  size?: LinkProps["boxSize"];
}

export const Status = (props: StatusProps) => {
  const { status: override, size = "8px", ...rest } = props;
  const { statusUrl } = useConfig();
  const status = useStatus(override);
  return (
    <Link
      showIcon
      isExternal
      href={statusUrl}
      alignItems="center"
      display="inline-flex"
      fontSize={{ base: "xs", lg: "sm" }}
      iconProps={{ mb: 0, mx: 0 }}
      {...rest}
    >
      <Dot status={status} size={size} />
      Status
    </Link>
  );
};

export const StatusButton = (props: StatusButtonProps) => {
  const { status: override, size = "8px", ...rest } = props;
  const { statusUrl } = useConfig();
  const status = useStatus(override);
  return (
    <Button
      showIcon
      href={statusUrl}
      variant="outline"
      alignItems="center"
      colorScheme="primary"
      display="inline-flex"
      fontSize={{ base: "xs", lg: "sm" }}
      externalIconProps={{ mb: 0, mx: 0 }}
      leftIcon={<Dot status={status} size={size} mr={0} />}
      {...rest}
    >
      Status
    </Button>
  );
};
