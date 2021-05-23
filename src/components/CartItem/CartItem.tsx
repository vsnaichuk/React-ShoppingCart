import { FC } from "react";
import { Button } from "@material-ui/core";
// Styles
import { Wrapper } from "./CartItem.styles";
// Types
import { ProductType } from "../../App.types";

type Props = {
  item: ProductType;
  addToCart: (clickedItem: ProductType) => void;
  removeFromCart: (id: number) => void;
};

const CartItem: FC<Props> = ({ item, addToCart, removeFromCart }) => {
  return (
    <Wrapper>
      <div>
        <h3>{item.title}</h3>

        <div className="details">
          <p>Price: ${item.price}</p>
          <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
        </div>

        <div className="buttons">
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => removeFromCart(item.id)}
          >
            -
          </Button>

          <p>{item.amount}</p>

          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => addToCart(item)}
          >
            +
          </Button>
        </div>

        <img src={item.image} alt={item.title} />
      </div>
    </Wrapper>
  );
};

export default CartItem;
