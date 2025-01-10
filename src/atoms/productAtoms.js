import { atom } from "recoil";

export const productAtom = atom({
  key: "productState",
  default: [
    { id: 1, name: "커피", price: 1000 },
    { id: 2, name: "딸기", price: 5000 },
    { id: 3, name: "치즈", price: 2000 },
  ],
});
