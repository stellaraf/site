import { notNullUndefined } from "~/types";

import { queryFn } from "./base";
import query from "./employees.gql";

import type { EmployeesQuery, EmployeesQueryVariables } from "~/types/schema";

export type Employees = NonNullable<PropOf<EmployeesQuery, "configuration">>["employees"];
export type Employee = ArrayElement<Employees>;

export default async function employees(
  variables: EmployeesQueryVariables = { config: "Stellar" },
): Promise<Employees> {
  const result = await queryFn<EmployeesQuery, EmployeesQueryVariables>({ query, variables });
  if (!notNullUndefined(result.configuration)) {
    throw new Error(`Failed to find configuration with query variables '${variables}'`);
  }
  return result.configuration.employees;
}
