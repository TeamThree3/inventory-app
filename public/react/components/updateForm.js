import React, { useState, useEffect} from 'react'
import { App } from './App.js';
import { confirmDelete  } from './App.js';

export const UpdateForm = (props) => {
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: ''
  })

  useEffect(() => {
    if (props.currentItem) {
        setData({
            name: props.currentItem.name,
            description: props.currentItem.description,
            price: props.currentItem.price,
            category: props.currentItem.category,
            image: props.currentItem.image
        });
    }
}, [props.currentItem]);

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    props.updateItem(props.itemId, data) 
    props.goHome(); 
}

  return (
    <>
     <div class="header">
            <h1>Unlock Your Stock</h1>
                <div class="header-right">
                <p><button type="button" className="addBackButton" onClick={props.goHome}>Back to Inventory</button></p>
                </div>
            </div>

      <h1>Update an Item</h1>
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="name">Name</label>
          <br />
          <input
            type="text"
            name="name"
            id="name"
            value={data.name}
            onChange={handleChange}
            required
          />
        </p>
        <p>
          <label htmlFor="description">Description</label>
          <br />
          <textarea
            id="description"
            name="description"
            value={data.description}
            onChange={handleChange}
            required
          />
        </p>
        <p>
          <label htmlFor="price">Price</label>
          <br />
          <input
            type="number"
            name="price"
            id="price"
            value={data.price}
            onChange={handleChange}
            required
          />
        </p>
        <p>
          <label htmlFor="category">Category</label>
          <br />
          <input
            type="text"
            name="category"
            id="category"
            value={data.category}
            onChange={handleChange}
            required
          />
        </p>
        <p>
          <label htmlFor="image">Image</label>
          <br />
          <input
            type="url"
            name="image"
            id="image"
            value={data.image}
            onChange={handleChange} 
            required
          />
        </p>
        <p>
          {/* <button type="submit" onClick={props.confirmUpdate}>Update Item</button> */}
          <button button className="submitUpdateItem" type="submit" onClick={() => props.confirmUpdate(props.itemId)}>Update Item</button>
        </p>
      </form>

    </>
  )}