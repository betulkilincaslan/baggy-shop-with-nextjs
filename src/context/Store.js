import { createContext, useReducer } from "react";
import Cookies from "js-cookie";

export const Store = createContext();

const initialState = {
  filteredCategory: [],
  cart: {
    cartItems: Cookies.get("cartItems")
      ? JSON.parse(Cookies.get("cartItems"))
      : [],
    shippingAddress: Cookies.get("shippingAddress")
      ? JSON.parse(Cookies.get("shippingAddress"))
      : {},
    paymentMethod: Cookies.get("paymentMethod")
      ? Cookies.get("paymentMethod")
      : "",
  },
  userInfo: Cookies.get("userInfo")
    ? JSON.parse(Cookies.get("userInfo"))
    : null,
};

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN_USER":
      return { ...state, userInfo: action.payload };
    case "LOGOUT_USER":
      return {
        ...state,
        userInfo: null,
        cart: {
          cartItems: [],
          shippingAddress: {},
          paymentMethod: "",
        },
      };

    case "ADD_TO_CART": {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      Cookies.set("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case "REMOVE_FROM_CART": {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      Cookies.set("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case "CLEAR_CART": {
      return { ...state, cart: { ...state.cart, cartItems: [] } };
    }

    case "SAVE_SHIPPING_ADDRESS":
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: {
            ...state.cart.shippingAddress,
            ...action.payload,
          },
        },
      };
    case "SAVE_PAYMENT_METHOD":
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };

    case "ADD_FILTERED_CATEGORY": {
      let newCategory = action.payload.toLowerCase().replaceAll(" ", "-");
      // console.log(state);
      const existCategory =
        state.filteredCategory.length > 0 &&
        state.filteredCategory.find((c) => c === newCategory);
      // console.log(existCategory);
      return {
        ...state,
        filteredCategory:
          newCategory !== existCategory
            ? state.filteredCategory.push(newCategory)
            : state.filteredCategory,
      };
    }
    case "REMOVE_FILTERED_CATEGORY": {
      let newCategory = action.payload.toLowerCase().replaceAll(" ", "-");
      return {
        ...state,
        filteredCategory: state.filteredCategory.filter(
          (item) => item !== newCategory
        ),
      };
    }
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
