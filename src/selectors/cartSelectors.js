// 총금액 및 제품 총 수 구하기
// 제품총수

import { selector } from "recoil";
import { cartAtom } from "../atoms/cartAtoms";
import { productAtom } from "../atoms/productAtoms";

export const cartTotalSelector = selector({
  key: "cartTotal",
  get: ({ get }) => {
    // 장바구니
    const cart = get(cartAtom);
    // 제품들
    const products = get(productAtom);
    // return cart.reduce((결과값, 현재요소값) => 연산, 초기값);
    return cart.reduce((total, item) => {
      const product = products.find(pro => item.id === pro.id);
      // 전체 합산이 필요하다
      // 현재까지 금액 + (제품가격 * 장바구니 담긴 개수)
      return total + product.price * item.qty;
    }, 0);
  },
});

// 장바구니 제품총수 구하기
export const cartItemTotalSelector = selector({
  key: "cartItemTotal",
  get: ({ get }) => {
    const cart = get(cartAtom);
    return cart.reduce((total, item) => total + item.qty, 0);
  },
});
