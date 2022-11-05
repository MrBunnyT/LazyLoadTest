import useFetch from "./useFetch";
import {useState,useCallback,useEffect,useRef} from "react" 
import Loader from '../loader.gif'
import '../Search.css';
import React from "react";

function LazyComp() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [newKey,setnewKey] = useState(false);
  const { loading, error, list } = useFetch(query, page,newKey,setnewKey);
  const loader = useRef(null);

  const handleChange = (e) => {
    setPage(1);
    setnewKey(true)
    setQuery(e.target.value);
  };

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  return (
    <div className="container">
    <h2 className="heading">Live Search: React Application</h2>
    <label className="search-label" htmlFor="search-input">
      <input
        type="text"
        name="query"
        value={ query }
        id="search-input"
        placeholder="Search..."
        onChange={handleChange}
      />
      <i className="fa fa-search search-icon" aria-hidden="true"/>
    </label>
      {/* <input type="text" value={query} onChange={handleChange} /> */}
      <div className="results-container">
        { list.map( img => {
			  			return (
			  				<a key={ img.id } href={ img.previewURL } className="result-item">
			  					<h6 className="image-username">{img.user}</h6>
			  					<div className="image-wrapper">
			  						<img className="image" src={ img.previewURL } alt={`${img.username} image` }/>
			  					</div>
			  				</a>
			  			)
			  		}) }
      </div>
      {error && <p className="message">{ error }</p>}
      {loading && <img src={ Loader } className={`search-loading ${ loading ? 'show' : 'hide' }`} alt="loader"/>}
      <div ref={loader} />
    </div>
  );
}

export default LazyComp;