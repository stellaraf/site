import { Button, type ButtonProps } from "~/components";

export const LoginButton = (props: ButtonProps) => (
  <Button
    color="secondary.600"
    _dark={{
      color: "white",
      borderColor: "white",
    }}
    target="_blank"
    borderWidth="1px"
    variant="outline"
    borderColor="secondary.500"
    href="https://launch.stellar.tech"
    _hover={{ backgroundColor: "secondary.50", _dark: { backgroundColor: "white" } }}
    {...props}
  >
    Log In
  </Button>
);
