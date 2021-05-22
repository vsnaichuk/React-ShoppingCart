export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

export const getCartItems = (): Promise<CartItemType[]> => {
  return fetch(EndPoints.CART_ITEMS).then(res =>
    res.json()
  );
};

export const setCartItems = (cartItem: CartItemType): Promise<CartItemType> => {
  return fetch(EndPoints.CART_ITEMS, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...cartItem })
  }).then(res => res.json());
};