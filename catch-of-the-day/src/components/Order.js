import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../helpers"
import { TransitionGroup, CSSTransition } from "react-transition-group"


const Order = ({ fishes, order, removeFromOrder }) => {
  const orderIds = Object.keys(order)
  const total = orderIds.reduce((prevTotal, key) => {
    const fish = fishes[key]
    const count = order[key]

    const isAvailable = fish && fish.status === 'available'
    if (isAvailable) {
      return prevTotal + (count * fish.price)
    }
    return prevTotal
  }, 0)


  const renderOrder = key => {
    const fish = fishes[key]
    const count = order[key]
    const isAvailable = fish && fish.status === 'available'   // equivalent to fish === true && fish.status === 'available'
    const transitionOptions = {
      key,
      classNames: "order",
      timeout: { enter: 250, exit: 250 }
    }
    if (!fish) return null // Render nothing untill data gets loaded

    return (!isAvailable ?
      <CSSTransition {...transitionOptions} >
        <li key={key}>
          Sorry {fish ? fish.name : 'fish'} is no longer available
        </li>
      </CSSTransition>
      :
      <CSSTransition {...transitionOptions} >
        <li key={key}>
          {count} lbs {fish.name}
          {formatPrice(count * fish.price)}
          <button onClick={() => removeFromOrder(key)} >X</button>
        </li>
      </CSSTransition>
    )
  }

  return (
    <div className="order-wrap">
      <h2>Order</h2>
      <TransitionGroup component="ul" className="order">
        {orderIds.map(renderOrder)}
      </TransitionGroup>
      <div className="total">
        <strong>{formatPrice(total)}</strong>
      </div>
    </div>
  )
}

Order.propTypes = {
  fishes: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    desc: PropTypes.string,
    status: PropTypes.string,
    price: PropTypes.number,
  }),
  order: PropTypes.object,
  removeFromOrder: PropTypes.func,
}

export default Order;
