import { useEffect, useRef, RefObject } from "react";

const useKeyBoardControl = (
  key: string,
  callback: (event: KeyboardEvent) => void
): RefObject<HTMLDivElement> => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === key) {
        callback(event);
      }
    };

    if (ref.current) {
      ref.current?.focus();
      ref.current?.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [key, callback]);

  return ref;
};

export default useKeyBoardControl;
