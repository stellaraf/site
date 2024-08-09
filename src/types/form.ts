interface SelectOptionAny {
  label: string;
}

export interface SelectOptionSingle<T extends Dict = Dict> extends SelectOptionAny {
  value: string;
  group?: string;
  description?: string;
  data?: T;
}
