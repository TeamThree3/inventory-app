import React, { useState } from 'react'

export const Form = (props) => {
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: ''
  })

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    props.addItem(data)
  }

  return (
    <>
    <div class="header">
            <h1>Unlock Your Stock</h1>
      <h1>Add an Item</h1>
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
          />
        </p>
        <p>
          <label htmlFor="price">Price</label>
          <br />
          <input
            type="text"
            name="price"
            id="price"
            value={data.price}
            onChange={handleChange}
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
          />
        </p>
        <p>
          <label htmlFor="image">Image</label>
          <br />
          <input
            type="text"
            name="image"
            id="image"
            value={data.image}
            onChange={handleChange}
          />
        </p>
        <p>
          <button type="submit">Add Item</button>
        </p>
      </form>
      <button type="button" className="link" onClick={props.goHome}>
        &larr; Back to Inventory
      </button>
      </div>
    </>
  )
}