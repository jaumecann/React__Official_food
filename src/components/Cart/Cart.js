import { useContext, useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import CheckoutForm from './CheckoutForm';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isSubmitted, setIsSubmitted] = useState(false)

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const goToCheckout = () => {
    setIsSubmitted(true)
  }

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)
          //BIND PRECONFIGURES A FUNCTION FOR FUTURE EXECUTION. PRECONFIGURES ARGUMENTS, first is what this is in the function
          }
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div>
        {isSubmitted && <CheckoutForm/>}
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
        {hasItems && !isSubmitted && <button className={classes.button} onClick={goToCheckout}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
