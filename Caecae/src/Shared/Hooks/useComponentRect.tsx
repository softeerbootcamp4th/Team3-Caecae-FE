import { useRef, useState, useEffect, useCallback } from "react";

interface Position {
  x: number;
  y: number;
  width: number;
  height: number;
}

const useComponentPosition = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<Position | null>(null);

  const handleResize = useCallback(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setPosition({
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
      });
    }
  }, []);

  useEffect(() => {
    handleResize();
    const observer = new ResizeObserver(() => {
      handleResize();
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
    window.addEventListener("scroll", handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleResize);
    };
  }, [handleResize]);

  return [ref, position];
};

export default useComponentPosition;
