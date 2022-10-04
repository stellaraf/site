import { useEffect, useRef, useCallback } from "react";
import isEqual from "react-fast-compare";

interface KeySequenceRef {
  keys: string[];
  result: string;
}

export function useKeySequence(seq: string, callback: () => void): void {
  const parts = seq.split(" ");
  const ref = useRef<KeySequenceRef>({ keys: [], result: "" });
  const callbackRef = useCallback(callback, [ref]);

  const listener = useCallback(
    (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const lastIdx = ref.current.keys.length - 1;
      const next = parts[lastIdx + 1] === key;
      if (next) {
        ref.current.keys.push(key);
        ref.current.result = ref.current.keys.join(" ");
      } else {
        ref.current.keys = [];
        ref.current.result = "";
      }
      if (isEqual(seq, ref.current.result)) {
        callbackRef();
        ref.current.keys = [];
        ref.current.result = "";
      }
    },
    [callbackRef],
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("keyup", listener);
    }
    return () => {
      window.removeEventListener("keyup", listener);
      ref.current.keys = [];
      ref.current.result = "";
    };
  }, [seq]);
}
