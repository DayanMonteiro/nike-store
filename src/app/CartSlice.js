import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  cartState: false,
  cartItems: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
};

const CartSlice = createSlice({
  initialState,
  name: "cart",
  reducers: {
    // altera o navbar para true para abrir o modal
    setOpenCart: (state, action) => {
      state.cartState = action.payload.cartState;
    },
    // altera o Cart para false pra fechar o modal
    setCloseCart: (state, action) => {
      state.cartState = action.payload.cartState;
    },
    // add produto no carrinho e soma a quartidade add de um mesmo produto
    setAddItemToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;

        // alert gerado pela lib toast
        toast.success(`Item Quantity Increased`);
      } else {
        const temp = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(temp);

        // alert gerado pela lib toast
        toast.success(`${action.payload.title} added to Cart`);
      }

      // persistir ps dados dos produtos no carrinho no localStorage
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    setRemoveItemFromCart: (state, action) => {
      const removeItem = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );

      state.cartItems = removeItem;
      localStorage.setItem("cart", JSON.stringify(state.cartItems));

      toast.success(`${action.payload.title} Removed From Cart`);
    },
  },
});

export const {
  setOpenCart,
  setCloseCart,
  setAddItemToCart,
  setRemoveItemFromCart,
} = CartSlice.actions;

export const selectCartState = (state) => state.cart.cartState;
export const selectCartItems = (state) => state.cart.cartItems;

export default CartSlice.reducer;
