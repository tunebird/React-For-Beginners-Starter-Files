import React from 'react'
import { formatPrice } from '../helpers'

class Order extends React.Component {
  constructor() {
    super();

    this.renderOrder = this.renderOrder.bind(this);
  }
  
  renderOrder(key) {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const removeButton = <button onClick={() => this.props.removeItem(key)}>Remove</button>

    if (!fish || fish.status === 'unavailable') {
      return <li key={key}>Sorry, {fish ? fish.name : 'fish'} is no longer available {removeButton}</li>
    }

    return (
      <li key={key}>
        <span>{count}lbs {fish.name}</span>
        <span className="price">{formatPrice(count * fish.price)}</span>
        {removeButton}
      </li>
    )
  }

	render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((total, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === 'available';
      if (isAvailable) {
        return total + (count * fish.price || 0);
      }
      return total;
    }, 0)
		return (
      <div className="order-wrap">
        <h2>Your Order</h2>
        <ul className="order">
          {orderIds.map(this.renderOrder)}
          <li className="total">
          <strong>Total:</strong>
          {formatPrice(total)}
          </li>
        </ul>

      </div>
		)
	}
}

export default Order;
