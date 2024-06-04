import React from 'react';
export const Item = (props) => {
  return <>
    <h3>{props.item.name}</h3>
    <p>{props.item.description}</p>
    <p>Price: ${props.item.price}</p>
    <p>Category: ${props.item.category}</p>
    <img src={props.item.image} alt={props.item.name} />
  </>
}