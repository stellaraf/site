interface SelectOptionAny {
  label: string;
}

export interface SelectOptionSingle<T extends Dict = Dict> extends SelectOptionAny {
  value: string;
  group?: string;
  data?: T;
}
