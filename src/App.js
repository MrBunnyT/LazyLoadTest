import React from 'react';
import Search from "./components/Search";
import LazyComp from './components/LazyM';
import {useState} from 'react';

function App(){
	const [comp, setComp] = useState("pag")
	return (
		<div>
  		<p>Select which comp u want to display</p>
			<div onChange={event=>{setComp(event.target.value)}}>
      	<input type="radio" defaultChecked value="pag" name="selectcomp"/> Pagination
      	<input type="radio" value="lazy" name="selectcomp"/> Lazy Loading
      </div>
			{comp==="pag" && <Search/>}
			{comp==="lazy" && <LazyComp/>}
		</div>
	);
}

export default App;
