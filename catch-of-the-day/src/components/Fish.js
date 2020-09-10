import React from 'react'
import PropTypes from "prop-types";
import { formatPrice } from "../helpers"

const Fish = ({ index, details: { name, image, price, desc, status }, addToOrder }) => {
  const isAvailable = status === 'available'
  return (
    <li className="menu-fish">
      <img src={image} alt={name} />
      <h3 className="fish-name">
        {name}
        <span className="price">{formatPrice(price)}</span>
      </h3>
      <p>{desc}</p>
      <button
        disabled={!isAvailable}
        onClick={() => addToOrder(index)}
      >
        {isAvailable ? 'Add To Cart' : 'Sold out'}
      </button>
    </li>
  )
}

Fish.propTypes = {
  index: PropTypes.string,
  details: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    desc: PropTypes.string,
    status: PropTypes.string,
    price: PropTypes.number,
  }),
  addToOrder: PropTypes.func
}

export default Fish
