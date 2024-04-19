import { useState, useEffect, useMemo } from "react";
import { db } from "../data/db";
import type { Guitar, CartItem } from "../types";

export const useCart = () => {
  const initialState = (): CartItem[] => {
    const localStorageCart = localStorage.getItem("guitars");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };
  const [data] = useState(db);
  const [cart, setCart] = useState(initialState);

  useEffect(() => {
    localStorage.setItem("guitars", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (guitar: Guitar) => {
    const itemExist = cart.findIndex((item) => item.id === guitar.id);
    if (itemExist >= 0) {
      const updateCart = [...cart];
      if (updateCart[itemExist].cant === 5) return;
      updateCart[itemExist].cant++;
      setCart(updateCart);
    } else {
      const newItem: CartItem = { ...guitar, cant: 1 };
      setCart([...cart, newItem]);
    }
  };

  const deleteItem = (id: Guitar["id"]) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
  };

  const handleCant = (id: Guitar["id"], action: string) => {
    const indexItem = cart.findIndex((i) => i.id === id);
    const newCart = [...cart];

    if (action === "sum") {
      if (newCart[indexItem].cant === 5) return;
      newCart[indexItem].cant++;
    } else {
      if (newCart[indexItem].cant === 1) {
        deleteItem(newCart[indexItem].id);
        return;
      }
      newCart[indexItem].cant--;
    }

    setCart(newCart);
  };

  const deleteCart = () => {
    setCart([]);
  };

  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const totalToPay = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.cant, 0),
    [cart]
  );
  return {
    data,
    cart,
    addToCart,
    deleteItem,
    handleCant,
    deleteCart,
    isEmpty,
    totalToPay,
  };
};
