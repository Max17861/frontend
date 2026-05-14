import { apiConfig } from "./network.js";

let cart = JSON.parse(localStorage.getItem("cart")) || [];

export const saveToCart = (goodId) => {
  localStorage.setItem(String(goodId), JSON.stringify(cart));
};

export const isInTheCart = (element) => {
  return favorites.some((e) => e === element);
};
