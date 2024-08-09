import { useEffect } from "react";

const useSpecificTimeEffect = (
  targetTime: Date,
  callback: (leftTime: number) => void
) => {
  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      callback(Math.floor((targetTime.getTime() - now.getTime()) / 1000));
    };

    checkTime();
    const intervalId = setInterval(checkTime, 1000);

    return () => clearInterval(intervalId);
  }, [targetTime, callback]);
};

export default useSpecificTimeEffect;
