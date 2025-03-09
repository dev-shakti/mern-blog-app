import showToast from "@/helpers/showToast";
import { useEffect, useState } from "react";

export default function useFetch(url,options={},dependencies=[]) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(url,options);
        const results = await response.json();

        if (!response.ok) {
          showToast("error", results.message);
          return;
        }

        setData(results)
      } catch (error) {
        console.error("error fetching data", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, dependencies);

  return {data,loading,error}
}
