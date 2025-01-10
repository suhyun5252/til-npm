# Recoil

- 장점 : context state 관리가 쉽다.
- 단점 : 업데이트가 없다.(개발자 퇴사)
- [사이트](https://recoiljs.org/ko/)
- [npm](https://www.npmjs.com/package/recoil)
- `npm i recoil`

## 코딩 컨벤션

- `/src/atoms` 폴더 생성
  : `/src/state` 폴더 생성하는 경우도 있다.
- `/src/selectors` 폴더 생성
  : 만들지 않는 경우도 있음

## 기초 코드

### 1. atoms 폴더에 atom 파일 만들기

- atom은 각각의 state 를 정의하는 것.
- `/src/atoms/counterAtom.js 파일` 생성

```js
import { atom } from "recoil";

export const counterAtom = atom({
  key: "counterAtom", //state 를 구분하는 키
  default: 0, // 초기값
});
```

```js
import { atom } from "recoil";

export const counterAtom = atom({
  key: "counterAtom", //state 를 구분하는 키
  default: 0, // 초기값
});

export const loginAtom = atom({
  key: "loginAtom",
  default: false,
});
```

- `main.jsx 에 RecoilRoot 설정`

```js
import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  // 전역 store 를 활용함
  <RecoilRoot>
    <App />
  </RecoilRoot>,
);
```

- `components/CounterAtom.jsx` 활용

```jsx
import { useRecoilState } from "recoil";
import { counterAtom, loginAtom } from "../atoms/counterAtom";

const CounterAtom = () => {
  const [count, setCount] = useRecoilState(counterAtom);
  const [isLogin, setIsLogin] = useRecoilState(loginAtom);
  return (
    <div>
      <h1>로그인 상태 : {isLogin ? "로그인 중" : "로그아웃 중"}</h1>
      <button onClick={() => setIsLogin(true)}>로그인</button>
      <button onClick={() => setIsLogin(false)}>로그아웃</button>
      <h1>CounterAtom : {count}</h1>
      <button onClick={() => setCount(count + 1)}>증가</button>
      <button onClick={() => setCount(count - 1)}>감소</button>
    </div>
  );
};
export default CounterAtom;
```

### 응용예제(Todo)

- `/src/atoms/todoAtoms.js` 생성
- `/src/component/TodoAtoms.jsx` 생성

```jsx
import { useState } from "react";
import { useRecoilState } from "recoil";
import { todoListAtom } from "../atoms/todoAtom";

const TodoAtoms = () => {
  const [todos, setTodos] = useRecoilState(todoListAtom);
  const [inputValue, setInputValue] = useState("");
  // 할일 추가
  const addTodo = () => {
    if (inputValue) {
      setTodos([
        ...todos,
        { id: Date.now(), title: inputValue, completed: false },
      ]);
    }
    setInputValue("");
  };
  const deleteTodo = id => {
    setTodos(todos.filter(item => item.id !== id));
  };

  const toggleTodo = id => {
    setTodos(
      todos.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );
  };
  return (
    <div>
      <h1>TodoAtoms</h1>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        <button onClick={() => addTodo()}>추가</button>
        <ul>
          {todos.map(item => {
            return (
              <li key={item.id}>
                <p
                  onClick={() => {
                    toggleTodo(item.id);
                  }}
                  style={{
                    textDecoration: item.completed ? "line-throgh" : "none",
                  }}
                >
                  {item.title}
                </p>
                <button
                  onClick={() => {
                    deleteTodo(item.id);
                  }}
                >
                  삭제
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default TodoAtoms;
```

### Selector 를 이용한 데이터 변경 및 필터링 작업

- `/src/selectors/todoSelector.js` 파일 생성

```js
// Recoil 에서 관리하는 데이터에서
//  완료된 항목만 필터링해서 출력해 보기

import { selector } from "recoil";
import { todoListAtom } from "../atoms/todoAtom";

export const completedTodosSelector = selector({
  key: "completedTodosSelector",
  get: ({ get }) => {
    const todos = get(todoListAtom);
    return todos.filer(item => item.completed);
  },
});
```

- `/src/selectors/TodoListSelector.jsx`

```jsx
import { useRecoilValue } from "recoil";
import { completedTodosSelector } from "../selectors/todoSelector";

const TodoListSelector = () => {
  // 나는 todos Atoms 에서 completed:true 것만 가져올것
  const completedTodos = useRecoilValue(completedTodosSelector);
  return (
    <div>
      <h1>완료된 할일 목록</h1>
      <ul>
        {completedTodos.map(item => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};
export default TodoListSelector;
```

## 응용예제(쇼핑몰 장바구니)

### atoms

- `/src/atoms/cartAtoms.js`

```js
import { atom } from "recoil";

export const cartAtom = atom({
  key: "cartState",
  default: [],
});
```

- `/src/atoms/productAtoms.js`

```js
import { atom } from "recoil";

export const productAtom = atom({
  key: "productState",
  default: [
    { id: 1, name: "커피", price: 100 },
    { id: 2, name: "딸기", price: 50 },
    { id: 3, name: "치즈", price: 200 },
  ],
});
```

### selectorts

`- /src/selectors/cartSelectors.js`

```js
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
      const product = product.find(pro => item.id === pro.id);
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
```

- `src/components/product `폴더 활용하기

  - `ProductList.jsx`

  ```jsx
  import { useRecoilValue } from "recoil";
  import { productAtom } from "../../atoms/productAtoms";
  import ProductItem from "./productItem";

  function ProductList() {
    const products = useRecoilValue(productAtom);
    return (
      <div>
        <h1>제품 리스트</h1>
        <div>
          {products.map(item => {
            return <ProductItem key={item.id} product={item} />;
          })}
        </div>
      </div>
    );
  }
  export default ProductList;
  ```

  - `ProductItem.jsx`

  ```jsx
  /* eslint-disable react/prop-types */
  import { useRecoilState } from "recoil";
  import { cartAtom } from "../../atoms/cartAtoms";

  function ProductItem({ product }) {
    const [cart, setCart] = useRecoilState(cartAtom);
    // 장바구니 담기
    const addCart = id => {
      // id 를 전달받으면 cart 에 제품 id와 qty:개수 업데이트
      setCart(currentCart => {
        // 현재 카트에 이미 동일한 id 제품이 있는지 검사하자
        const existID = currentCart.find(item => item.id === id);
        // 만약 장바구니에 제품이 담겼다면 개수 증가
        if (existID) {
          // 개수 증가
          return currentCart.map(item =>
            item.id === id ? { ...item, qty: item.qty + 1 } : item,
          );
        } else {
          // 새로운 ID 추가 및 개수는 1로 셋팅
          return [...currentCart, { id, qty: 1 }];
        }
      });
    };
    return (
      <div style={{ display: "flex", border: "2px solid #bbb" }}>
        <h3>{product.name}</h3>
        <p>{product.price}원</p>
        <button
          onClick={() => {
            addCart(product.id);
          }}
        >
          장바구니 담기
        </button>
      </div>
    );
  }
  export default ProductItem;
  ```

- `src/components/cart `폴더 활용하기
- CartList.jsx

```jsx
import { useRecoilValue } from "recoil";
import { cartAtom } from "../../atoms/cartAtoms";
import CartItem from "./CartItem";

const CartList = () => {
  const cart = useRecoilValue(cartAtom);
  return (
    <div>
      <h1>장바구니</h1>
      <div>
        {cart.map(item => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
export default CartList;
```

- CartItem.jsx

```jsx
import { useRecoilState, useRecoilValue } from "recoil";
import { productAtom } from "../../atoms/productAtoms";
import { cartAtom } from "../../atoms/cartAtoms";

/* eslint-disable react/prop-types */
const CartItem = ({ item }) => {
  const [cart, setCart] = useRecoilState(cartAtom);
  const products = useRecoilValue(productAtom);
  const product = products.find(prd => prd.id === item.id);
  const removeCart = id => {
    setCart(currentCart => currentCart.filter(prd => prd.id !== id));
  };
  return (
    <div>
      <h3>제품이름 : {product.name}</h3>
      <p>수량 : {item.qty}</p>
      <p>가격 : {product.price * item.qty}원</p>
      <button
        onClick={() => {
          removeCart(item.cart);
        }}
      >
        삭제
      </button>
    </div>
  );
};
export default CartItem;
```

- `/src/componets/cart/CartSummary.jsx`

```jsx
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
```
