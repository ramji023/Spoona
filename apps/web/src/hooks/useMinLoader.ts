import { UseQueryResult } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const useMinLoader = <TData>({
  query,
  loadingTime,
}: {
  query: UseQueryResult<TData>;
  loadingTime: number;
}) => {
  const [loading, setLoading] = useState(query.isLoading);
  const [loadStartTime, setLoadStartTime] = useState<number | null>(null);

  useEffect(() => {
    // check if query is isLoading state first time
    if (query.isLoading && loadStartTime === null) {
      setLoadStartTime(Date.now());
      setLoading(true);
    }

    // when loading finish
    if (!query.isLoading && loadStartTime !== null) {
      const elapsedTime = Date.now() - loadStartTime;
      const remainingTime = Math.max(0, loadingTime - elapsedTime);
      const timer = setTimeout(() => {
        setLoading(false);
        setLoadStartTime(null);
      }, remainingTime);

      return () => clearTimeout(timer);
    }
  }, [query.isLoading, loadingTime, loadStartTime]);

  return { ...query, isLoading: loading || query.isLoading };
};

export default useMinLoader;
