import React, { useState, useEffect } from 'react';
import { Items } from './Itemlist';
// import and prepend the api url to any fetch calls
import apiURL from '../api';

export const App = () => {
    const [items, setItems] = useState([]);
      
    useEffect(() => {
          async function fetchItems(){
        try {
            const response = await fetch(`${apiURL}/items`);
            const itemsData = await response.json();
            setItems(itemsData);
        } catch (err) {
            console.log("Oh no an error! ", err)
        }
    }
	
	fetchItems();
    }, []);
    return (
         <main>
       <h1>Inventory App</h1>
	
		<ul>
			{items.map(item => (
				<li key={item.id}>
					<h2>{item.name}</h2>
					<img src ={item.image} alt=""></img>
				</li>
		))}</ul>
	         {/* <Items items={item} /> */}
         </main>
    )

    // return (
    //     <div className="App">
    //         <h1>Item List</h1>
    //         <Items items={items} />
    //     </div>
    // );
}