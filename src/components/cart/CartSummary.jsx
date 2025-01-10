import { useRecoilValue } from "recoil";
import {
  cartItemTotalSelector,
  cartTotalSelector,
} from "../../selectors/cartSelectors";

const CartSummary = () => {
  const total = useRecoilValue(cartTotalSelector);
  const count = useRecoilValue(cartItemTotalSelector);
  return (
    <div>
      <p>총 상품 수 :{count} </p>
      <p>총 금액 : {total.toLocaleString()}</p>
    </div>
  );
};
export default CartSummary;
