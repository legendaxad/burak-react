import { useState } from "react";
import { CartItem } from "../../lib/types/search";

const useBasket = () => {
  const cartJson: string | null = localStorage.getItem("cartData"); // Retrieve the cart data from localStorage. If it exists, parse it as JSON; otherwise, initialize an empty array.
  const currentCart = cartJson ? JSON.parse(cartJson) : []; // Initialize the current cart state with the parsed cart data or an empty array if no data is found in localStorage.
  const [cartItems, setCartItems] = useState<CartItem[]>(currentCart); // State variable to hold the current items in the cart. It is initialized with the currentCart value, which is either the parsed cart data from localStorage or an empty array.
  //HANDLERS
  const onAdd = (input: CartItem) => {
    const exist: any = cartItems.find(
      (item: CartItem) => item._id === input._id,
    );
    if (exist) {
      const cartUpdate = cartItems.map((item: CartItem) =>
        item._id === input._id
          ? { ...exist, quantity: exist.quantity + 1 }
          : item,
      );
      setCartItems(cartUpdate);
      localStorage.setItem("cartData", JSON.stringify(cartUpdate));
    } else {
      const cartUpdate = [...cartItems, { ...input }];
      setCartItems(cartUpdate);
      localStorage.setItem("cartData", JSON.stringify(cartUpdate));
    }
  }; // Handler function to add an item to the cart. It checks if the item already exists in the cart. If it does, it increments the quantity of that item. If it doesn't, it adds the new item to the cart. The updated cart is then saved to localStorage and the state is updated accordingly.
  const onRemove = (input: CartItem) => {
    const exist: any = cartItems.find(
      (item: CartItem) => item._id === input._id,
    );
    if (exist.quantity === 1) {
      const cartUpdate = cartItems.filter(
        (item: CartItem) => item._id !== input._id,
      );
      setCartItems(cartUpdate);
      localStorage.setItem("cartData", JSON.stringify(cartUpdate));
    } else {
      const cartUpdate = cartItems.map((item: CartItem) =>
        item._id === input._id
          ? { ...exist, quantity: exist.quantity - 1 }
          : item,
      );
      setCartItems(cartUpdate);
      localStorage.setItem("cartData", JSON.stringify(cartUpdate));
    }
  }; // Handler function to remove an item from the cart. It checks if the item exists in the cart and its quantity. If the quantity is 1, it removes the item from the cart. If the quantity is greater than 1, it decrements the quantity of that item. The updated cart is then saved to localStorage and the state is updated accordingly.
  const onDelete = (input: CartItem) => {
    const cartUpdate = cartItems.filter(
      (item: CartItem) => item._id !== input._id,
    );
    setCartItems(cartUpdate);
    localStorage.setItem("cartData", JSON.stringify(cartUpdate));
  }; // Handler function to delete an item from the cart. It filters out the item with the specified ID from the cart and updates the state and localStorage accordingly.
  const onDeleteAll = () => {
    setCartItems([]);
    localStorage.removeItem("cartData");
  }; // Handler function to delete all items from the cart. It clears the cart state and removes the cart data from localStorage.
  return {
    cartItems,
    onAdd,
    onRemove,
    onDelete,
    onDeleteAll,
  }; // The custom hook returns the current cart items and the handler functions for adding, removing, deleting individual items, and deleting all items from the cart. This allows components to easily manage the shopping cart state and persist it in localStorage.
};

export default useBasket;
