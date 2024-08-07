import { type SetStateAction, createContext, useContext, useState } from "react";

interface DraftContextProps {
  draft: boolean;
  setDraft(setState: SetStateAction<boolean>): void;
}

type DraftProviderProps = React.PropsWithChildren<{ initial: boolean }>;

const DraftContext = createContext<DraftContextProps>({
  draft: false,
  setDraft() {
    return;
  },
});

export const DraftProvider = (props: DraftProviderProps) => {
  const { initial, ...rest } = props;
  const [draft, setDraft] = useState(initial);
  return <DraftContext.Provider value={{ draft, setDraft }} {...rest} />;
};

export function useDraft(): [boolean, DraftContextProps["setDraft"]] {
  const { draft, setDraft } = useContext(DraftContext);
  return [draft, setDraft];
}
