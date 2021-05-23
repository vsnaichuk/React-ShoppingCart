import { useState } from "react";
import { useProducts } from "./services/useProducts";
import Item from "./components/Item/Item";
import Cart from "./components/Cart/Cart";
import { AddShoppingCart } from "@material-ui/icons";
import { Badge, Drawer, Grid, LinearProgress } from "@material-ui/core";
// Styles
import { Wrapper, StyledButton } from "./App.styles";
// Types
import { ProductType } from "./App.types";

const App = () => {
  const { products, isLoading, error } = useProducts();
  const [cartItems, setCartItems] = useState([] as ProductType[]);
  const [cartOpen, setCartOpen] = useState(false);

  const handleAddToCart = (clickedItem: ProductType) => {
    setCartItems((prev) => {
      const isInCart = prev.some((i) => i.id === clickedItem.id);

      if (isInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }

      return [...prev, { ...clickedItem, amount: 1 }];

      // Using reduce()
      //   if (isInCart) {
      //     return prev.reduce((ack, item) => {
      //       if (item.id === clickedItem.id) {
      //         return [...ack, { ...item, amount: item.amount + 1 }];
      //       }
      //       return [...ack, item];
      //     }, [] as ProductType[]);
      //   }
      //
      //   return [...prev, { ...clickedItem, amount: 1 }];
      // });
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) => {
      const idx = prev.findIndex((i) => i.id === id);

      if (prev[idx].amount === 1) {
        return [...prev.slice(0, idx), ...prev.slice(idx + 1)];
      } else {
        return prev.map((item) =>
          item.id === id ? { ...item, amount: item.amount - 1 } : item
        );
      }
    });

    // Using reduce()
    //   prev.reduce((ack, item) => {
    //     if (item.id === id) {
    //       if (item.amount === 1) return ack;
    //       return [...ack, { ...item, amount: item.amount - 1 }];
    //     } else {
    //       return [...ack, item];
    //     }
    //   }, [] as ProductType[])
    // );

    // Without map
    // const idx = prev.findIndex((i) => i.id === id);
    // if (prevItems[idx].amount === 1) {
    //   return [...prevItems.slice(0, idx), ...prevItems.slice(idx + 1)];
    // } else {
    //   const newItem = {
    //     ...prevItems[idx],
    //     amount: prevItems[idx].amount - 1,
    //   };
    //   return [
    //     ...prevItems.slice(0, idx),
    //     newItem,
    //     ...prevItems.slice(idx + 1),
    //   ];
    // }
  };

  const getTotalItems = (items: ProductType[]) => {
    return items.reduce((ack: number, item) => ack + item.amount, 0);
  };

  if (isLoading) return <LinearProgress />;
  if (error) return <pre>ERROR! {error}...</pre>;

  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>

      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCart />
        </Badge>
      </StyledButton>

      <Grid container spacing={3}>
        {products?.map((product) => (
          <Grid item key={product.id} xs={12} sm={4}>
            <Item item={product} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default App;
