import type { SimpleGridProps, UseDisclosureReturn, BoxProps } from "@chakra-ui/react";
import type { Employees } from "~/queries";

export interface EmployeeGridContext {
  employees: Employees;
}

export type EmployeeGridProps = SimpleGridProps & EmployeeGridContext;

export interface AvatarPhotoProps extends BoxProps, Pick<UseDisclosureReturn, "onOpen"> {
  index: number;
}

export type AvatarDetailProps = Pick<UseDisclosureReturn, "isOpen" | "onClose">;
