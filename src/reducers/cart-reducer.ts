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

export const initialState: CartState = {
  data: db,
  cart: [],
};

export const cartReducer = (
  state: CartState = initialState,
  action = CartActions
) => {
  if (action.type === "add-to-cart") {
    return {
      ...state,
    };
  }
  if (action.type === "delete-item") {
    return {
      ...state,
    };
  }
  if (action.type === "handle-cant") {
    return {
      ...state,
    };
  }
  if (action.type === "delete-cart") {
    return {
      ...state,
    };
  }
  return state;
};
