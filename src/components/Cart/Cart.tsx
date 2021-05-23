import { FC } from "react";
import CartItem from "../CartItem/CartItem";
// Styles
import { Wrapper } from "./Cart.styles";
// Types
import { ProductType } from "../../App.types";

type Props = {
  cartItems: ProductType[];
  addToCart: (clickedItem: ProductType) => void;
  removeFromCart: (id: number) => void;
};

const Cart: FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
  const calculateTotal = () => {
    return cartItems.reduce(
      (ack: number, item) => ack + item.amount * item.price,
      0
    );
  };

  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 && <p>No items in cart.</p>}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}

      <h2>Total: ${calculateTotal().toFixed(2)}</h2>
    </Wrapper>
  );
};

export default Cart;
