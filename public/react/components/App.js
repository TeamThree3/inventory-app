import React, { useState, useEffect } from 'react';
import { Items } from './Itemlist';
import { Item } from './Item';
import { Form } from './Form'
import { UpdateForm } from './updateForm'
// import and prepend the api url to any fetch calls
import apiURL from '../api';

export const App = () => {
    const [items, setItems] = useState([]);
	const [currentItem, setCurrentItem] = useState(null);
    const [isAddingItem, setIsAddingItem] = useState(false);
    const [isUpdatingItem, setIsUpdatingItem] = useState(false);


    function goHome() {
        setCurrentItem(null)
        setIsAddingItem(false)
        setIsUpdatingItem(false)
      }

	async function deleteItem(id) {
		const response = await fetch (`${apiURL}/items/${id}`, {
			method: "DELETE",
		});

		const filteredItems = items.filter(item => {
			if (item.id === id) {
				return false;
			} else {
				return true;
			}
		});
		setItems(filteredItems);
		setCurrentItem(null);
	}

	function confirmDelete(id){
		const confirmed = window.confirm("Are you sure you want to delete this item?");
		if (confirmed){
			deleteItem(id);
		}
	}
    
    async function addItem(item){
        const response = await fetch (`${apiURL}/items`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })

        const newItem = await response.json()
        setItems([...items, newItem])
        setIsAddingItem(false)
    }

    async function updateItem(id, updatedItem){
        const response = await fetch (`${apiURL}/items/${id}`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedItem)
        })

        if (response.ok) {
            const updatedItemData = await response.json();
            setItems(items.map(item => (item.id === id ? updatedItemData : item)));
        } else {
            console.error('Failed to update item:', response.status, response.statusText);
        }
    }

    function confirmUpdate(id){
		const confirmed = window.confirm("Are you sure you want to update this item?");
		if (confirmed){
			updateItem(id);
		}
	}

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

    useEffect(() => {
        if (currentItem) {
          document.title = `${currentItem.name} - Inventory App`
        } else if (isAddingItem) {
          document.title = 'Add an Item - Inventory App'
        } else if (isUpdatingItem) {
            document.title = 'Update an Item - Inventory App'
        } else {
          document.title = 'Inventory App'
        }
      }, [currentItem, isAddingItem, isUpdatingItem])
    
      if (isAddingItem) {
        return <Form goHome={goHome} addItem={addItem} />
      }

      if (isUpdatingItem) {
        return <UpdateForm goHome={goHome} updateItem={updateItem} itemId={currentItem.id} />
    }
    


if (currentItem) {
	return (
		<main>
			<h1>{currentItem.name}</h1>
			<p>£{currentItem.price}</p>
			<p>{currentItem.description}</p>
			<img src ={currentItem.image} alt=""/>
			<p><button onClick={() => setCurrentItem(null)}>All Items</button></p>
			<p><button onClick={() => confirmDelete(currentItem.id)}>Delete Item</button></p>
            <p><button onClick={() => setIsUpdatingItem(true)}>Update Item</button></p>
        </main>
	);
}


    return (
         <main>
       <h1>Inventory App</h1>
       <p><button onClick={() => setIsAddingItem(true)}> Add Item </button></p>

		<ul>
			{items.map(item => (
				<li key={item.id}>
					<h2>
						<button onClick={() => setCurrentItem(item)}>{item.name}</button>
					</h2>
					<img src ={item.image} alt="" />
				</li>
		))}</ul>
	         {/* <Items items={item} /> */}
         </main>
    )
}