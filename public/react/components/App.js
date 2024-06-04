import React, { useState, useEffect } from 'react';
import { Items } from './Itemlist';
// import and prepend the api url to any fetch calls
import apiURL from '../api';
export const App = () => {
    const [items, setItems] = useState([]);
        async function fetchItems(){
        try {
            const response = await fetch(`${apiURL}/items`);
            const itemsData = await response.json();
            setItems(itemsData);
        } catch (err) {
            console.log("Oh no an error! ", err)
        }
    }
    useEffect(() => {
        fetchItems();
    }, []);
    // return (
    //     <main>
    //   <h1>Team Three 3 Store</h1>
    //         <h2>All things :fire:</h2>
    //         <itemlists items={item} />
    //     </main>
    // )

    return (
        <div className="App">
            <h1>Item List</h1>
            <Items items={items} />
        </div>
    );
}