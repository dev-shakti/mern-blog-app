import showToast from "@/helpers/showToast";
import { useEffect, useState } from "react";

export default function useFetch(url, options = {}, dependencies = []) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchData() {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(url, options);
      const results = await response.json();

    if (!response.ok) {
      showToast("error", results.message || "Something went wrong");
      return;
    }
           
      setData(results);
      
    } catch (error) {
      console.error("error fetching data", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if(!url){
      return;
    }
    fetchData();
  }, dependencies);

  return { data, loading, error,refetch: fetchData};
}
