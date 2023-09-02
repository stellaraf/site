import { is } from "~/lib";
import { Stage } from "~/types";

import { queryFn } from "./base";
import query from "./gql/employees.gql";

import type { EmployeesQuery, EmployeesQueryVariables } from "~/types";

export type Employees = NonNullable<PropOf<EmployeesQuery, "configuration">>["employees"];
export type Employee = ArrayElement<Employees>;

export default async function employees(variables: EmployeesQueryVariables): Promise<Employees> {
  const { config = "Stellar", stage = Stage.Published } = variables;
  const result = await queryFn<EmployeesQuery, EmployeesQueryVariables>({
    query,
    variables: { config, stage },
  });
  if (!is(result.configuration)) {
    throw new Error(
      `Failed to find configuration with query variables '${JSON.stringify({ config, stage })}'`,
    );
  }
  return result.configuration.employees;
}
