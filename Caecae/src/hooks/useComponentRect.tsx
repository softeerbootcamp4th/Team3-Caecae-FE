import { useRef, useState, useEffect, useCallback } from "react";

interface Position {
  x: number;
  y: number;
  width: number;
  height: number;
}

const useComponentPosition = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<Position>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

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
    handleResize(); // 초기 위치 설정

    const observer = new ResizeObserver(() => {
      handleResize();
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
    window.addEventListener("scroll", handleResize); // 스크롤 위치 변경 감지

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleResize);
    };
  }, [handleResize]);

  return [ref, position] as const;
};

export default useComponentPosition;
