import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function useFetch(query, page, newKey,setnewKey) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);

  const sendQuery = useCallback(async () => {
    try {
      await setLoading(true);
      await setError(false);
      const res = await axios.get(`https://pixabay.com/api/?key=31111118-5c4c4a3f5f276b0aeb396a207&q=${query}&page=${page}`);
      if(newKey){
        setnewKey(false);
        setList([])
      }
      await setList((prev) => [...prev, ...res.data.hits]);
      if(res.data.hits.length===0){
        setError("No more results")
      }
      setLoading(false);
    } catch (err) {
      setError(err);
    }
  }, [query, page]);

  useEffect(() => {
    sendQuery(query);
  }, [query, sendQuery, page]);

  return { loading, error, list };
}

export default useFetch;