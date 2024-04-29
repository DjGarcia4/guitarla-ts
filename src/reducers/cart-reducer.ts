import { db } from "../data/db";
import { CartItem, Guitar } from "../types";

export type CartActions =
  | { type: "add-to-cart"; payload: { item: Guitar } }
  | { type: "delete-item"; payload: { id: Guitar["id"] } }
  | { type: "handle-cant"; payload: { id: Guitar["id"]; action: string } }
  | { type: "delete-cart" };

export type CartState = {
  data: Guitar[];
  cart: CartItem[];
};

const initialCart = (): CartItem[] => {
  const localStorageCart = localStorage.getItem("guitars");
  return localStorageCart ? JSON.parse(localStorageCart) : [];
};

export const initialState: CartState = {
  data: db,
  cart: initialCart(),
};

export const cartReducer = (
  state: CartState = initialState,
  action: CartActions
) => {
  if (action.type === "add-to-cart") {
    const itemExist = state.cart.find((i) => i.id === action.payload.item.id);
    let updateCart: CartItem[] = [];
    if (itemExist) {
      updateCart = state.cart.map((item) => {
        if (item.id === action.payload.item.id) {
          if (item.cant < 5) {
            return { ...item, cant: item.cant + 1 };
          } else {
            return item;
          }
        } else {
          return item;
        }
      });
    } else {
      const newItem: CartItem = { ...action.payload.item, cant: 1 };
      updateCart = [...state.cart, newItem];
    }

    return {
      ...state,
      cart: updateCart,
    };
  }
  if (action.type === "delete-item") {
    const newCart = state.cart.filter((item) => item.id !== action.payload.id);

    return {
      ...state,
      cart: newCart,
    };
  }
  if (action.type === "handle-cant") {
    const itemExist = state.cart.find((i) => i.id === action.payload.id);
    let updateCart: CartItem[] = [];
    if (itemExist) {
      updateCart = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          if (action.payload.action === "sum") {
            if (item.cant === 5) return item;
            return { ...item, cant: item.cant + 1 };
          } else {
            if (item.cant === 1) return item;
            return { ...item, cant: item.cant - 1 };
          }
        } else {
          return item;
        }
      });
    }

    return {
      ...state,
      cart: updateCart,
    };
  }
  if (action.type === "delete-cart") {
    return {
      ...state,
      cart: [],
    };
  }
  return state;
};
