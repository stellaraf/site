interface TitleOptions {
  special: string[];
}

declare module 'title' {
  function Title(newtitle: string, options?: TitleOptions): string;
  namespace Title {
    function reset(): void;
  }

  export = Title;
}
