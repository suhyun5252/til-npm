# Redux Toolkit (RTK)

- 전역 상태(즉, Context) 를 관리하는 `상태관리도구`
  : Context API (리엑트 빌트인)
  : Redux , Redux Toolkt, Recoil, Zustands

## 관련 사이트

- https://ko.redux.js.org/introduction/getting-started/
- https://redux.js.org/

## 레퍼런스 사이트에서 RTK 를 추천함

- `npm install @reduxjs/toolkit`
- `npm install redux`
- `npm i react-redux`

## RTK의 기본 예제(`순서를 준수`)

- 학습순서는 `무조건 순서대로`
- 폴더구조, 파일명 등등..

- `src/store` 폴더 생성
- `store.js` 파일 생성

```js
// store 설정
//  store 는 전역에서 사용할 state를 말한다.
//  회사에서는 /src/store 폴더를 주로 생성한다.
//  store 는 1개만 만들 수 있다. => 전역 state 는 1개만 만들수 있다.
import { configureStore } from "@reduxjs/toolkit";

//  파일명은 주로 store.js 라고 칭한다.
const store = configureStore({
  reducer: {
    // store 를 쪼개서 slice 해서 사용
  },
});
```

- `/src/features/counter 폴더` 생성
- `/src/features/counter/counterSlice.js`

```js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

// 코딩 컨벤션
// Slice 는 store 를 쪼개서 사용한다는 의미
const counterSlice = createSlice({
  // 슬라이드 구분 이름(문자열)
  name: "counterSlice",
  // 슬라이스 초기 값(initialState: initialState 축약)
  initialState,
  // store/counterSlice 에 저장된 값 갱신 함수
  //상태를 갱신해주는 함수
  reducers: {
    add: state => {
      state.count += 1;
    },
    minus: state => {
      state.count -= 1;
    },
    reset: state => {
      state.count = 0;
    },
  },
});
// Reduce 함수를 외부로 내보내서 dispatch 해주도록
// action : type 의 구분, payload 전달
export const { add, minus, reset } = counterSlice.actions;
export default counterSlice.reducer;
```

- `/src/store/store.js 폴더` 생성 (전역 state 보관장소)
  : Slice 로 만든 reducer 배치

  ```js
  // store 설정
  //  store 는 전역에서 사용할 state를 말한다.
  //  회사에서는 /src/store 폴더를 주로 생성한다.
  //  store 는 1개만 만들 수 있다. => 전역 state 는 1개만 만들수 있다.
  import { configureStore } from "@reduxjs/toolkit";
  // 카운터용 Reducer를 활용
  import counterReducer from "../features/counter/countSlice";
  //  파일명은 주로 store.js 라고 칭한다.
  const store = configureStore({
    reducer: {
      // store 를 쪼개서 slice 해서 사용
      counter: counterReducer,
    },
  });

  export default store;
  ```

- `/src/components/Counter.jsx` 생성

```jsx
import { useDispatch, useSelector } from "react-redux";
// store 에 저장된 Slice 중 어떤 Slice의 Action 을 쓸것인가
import { add, minus, reset } from "../features/counter/countSlice";
function Counter() {
  // RTK 의 store 를 불러들여서 그중 counter 를 사용하겠다.
  // 직접 state의 값에 접근
  // const count = useSelector(state => state.counter.count);
  // 객체 구조분해 할당으로 접근
  const { count } = useSelector(state => state.counter);
  // RTK 의 store 의 counter 의 값 갱신 dispatch 사용하겠다.
  const dispatch = useDispatch();

  return (
    <div>
      <p>카운터 값 : {count}</p>
      <button onClick={() => dispatch(add())}>증가</button>
      <button onClick={() => dispatch(minus())}>감소</button>
      <button onClick={() => dispatch(reset())}>리셋</button>
    </div>
  );
}
export default Counter;
```

- `/src/App.jsx` 에 Provider 셋팅 (`전역 store 접근`)

```jsx
import { Provider } from "react-redux";
import Counter from "./components/Counter";

function App() {
  return (
    // 전역 store 를 활용함
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}
export default App;
```

## todoSlice 추가해보기

- `/src/feature/todo` 폴더 생성
- `/src/feature/todoSlice.js` 파일 생성

```js
import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const todoSlice = createSlice({
  name: "todoSlice",
  initialState,
  // reducer 함수 : store 의  todoSlice 의 state 를 갱신
  // state 는 slice 에 보관하고 있는 데이터
  // action 은 state 에 업데이트할 새로운 데이터
  reducers: {
    // action{id:Date.now(), title:"안녕하세요", completed : false}
    // dispatch(addTodo("안녕"))
    addTodo: (state, action) => {
      state.push({ id: Date.now(), title: action.payload, completed: false });
    },
    // action id : 기존아이디
    // dispatch(toggleTodo("12345678"))
    toggleTodo: (state, action) => {
      // 배열.find 는 true 인 요소를 찾는다.
      const todo = state.find(item => item.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    // action id : 기존아이디
    // dispatch( deleteTodo(123456))
    deleteTodo: (state, action) => {
      state.filter(item => item.id !== action.payload);
    },
  },
});
// dispatch action 함수 내보내기
export const { addTodo, toggleTodo, deleteTodo } = todoSlice.actions;

// 기본 reducer을 내보내기
export default todoSlice.reducer;
```

- `/src/store/store.js` 에 `todoSlice 추가` 한다.

```js
import { configureStore } from "@reduxjs/toolkit";
// 카운터용 Reducer를 활용
import counterReducer from "../features/counter/countSlice";
// todo Reducer를 활용
import todoReducer from "../features/counter/todoSlice";
//  파일명은 주로 store.js 라고 칭한다.
const store = configureStore({
  reducer: {
    // store 를 쪼개서 slice 해서 사용
    counter: counterReducer,
    todo: todoReducer,
  },
});

export default store;
```

- /src/app.jsx 가 아니고, main.jsx 에 Provider 배치

```jsx
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
// 전역 store 를 활용함
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
```

```jsx
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, toggleTodo } from "../features/todo/todoSlice";

function Todo() {
  // store 의  todoSlice 의 state 출력
  const todos = useSelector(state => state.todo);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Todo</h1>
      <div>
        {todos.map(item => (
          <div key={item.id}>
            {item.title}
            <button onClick={() => dispatch(toggleTodo(item.id))}>변경</button>
            <button onClick={() => dispatch(deleteTodo(item.id))}>삭제</button>
          </div>
        ))}
        <button onClick={() => dispatch(addTodo("안녕할일"))}>추가</button>
      </div>
    </div>
  );
}
export default Todo;
```

## userSlice 추가해보기

- `/src/store/store.js` 에 `userSlice 추가` 한다.

```js
import { configureStore } from "@reduxjs/toolkit";
// 카운터용 Reducer를 활용
import counterReducer from "../features/counter/countSlice";
// todo Reducer를 활용
import todoReducer from "../features/todo/todoSlice";
// 사용자
import userReducer from "../features/user/userSlice";
//  파일명은 주로 store.js 라고 칭한다.
const store = configureStore({
  reducer: {
    // store 를 쪼개서 slice 해서 사용
    counter: counterReducer,
    todo: todoReducer,
    user: userReducer,
  },
});

export default store;
```

- `/src/feature/user` 폴더 생성
- `/src/feature/userSlice.js` 파일 생성

```js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {};
const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    showInfo: state => {
      console.log("사용자 정보 : ", state);
    },
  },
});
export const { showInfo } = userSlice.actions;
export default userSlice.reducer;
```

- `userSlice.js` 에 비동기 API 연동 추가
  : extraReducers 와 createAsncThunk 를 체크하자.

  ```js
  import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
  import axios from "axios";

  const initialState = {
    loading: false,
    data: [],
    error: null,
  };
  // 비동기 작업
  // redux toolkit 에 있는 외부 Api 연동을 위한 AsyncThunk 만들기
  // 관례상 store에 user/ 메서드의 이름
  export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    return res.data;
  });
  export const fetchUserOne = createAsyncThunk(
    "user/fetchUserOne",
    async () => {
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/users/1",
      );
      return res.data;
    },
  );

  const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
      showInfo: state => {
        console.log("사용자 정보 : ", state);
      },
    },
    // 비동기 즉 api 연동 작업후 slice의 state 관리
    extraReducers: builder => {
      builder
        .addCase(fetchUser.pending, (state, action) => {
          // 연결중...
          // console.log("fetchUser.pending : ", action.payload);
          state.loading = true;
          state.error = false;
          // state.data = []; 데이터는 우리가 직접 처리 안하겠다.
        })
        .addCase(fetchUser.fulfilled, (state, action) => {
          // 성공적 연결 및 데이터 출력
          // console.log("fetchUser.fulfilled : ", action.payload);
          state.loading = false;
          state.error = null;
          state.data = action.payload;
        })
        .addCase(fetchUser.rejected, (state, action) => {
          // console.log("fetchUser.rejected : ", action.payload);
          state.loading = false;
          state.error = action.payload;
        })

        .addCase(fetchUserOne.pending, (state, action) => {
          console.log("fetchUserOne.pending : ", action.payload);
        })
        .addCase(fetchUserOne.fulfilled, (state, action) => {
          console.log("fetchUserOne.fulfilled : ", action.payload);
        })
        .addCase(fetchUserOne.rejected, (state, action) => {
          console.log("fetchUserOne.rejected : ", action.payload);
        });
    },
  });
  export const { showInfo } = userSlice.actions;
  export default userSlice.reducer;
  ```

- `/src/componets/UserInfo.jsx`

```jsx
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, fetchUserOne } from "../features/user/userSlice";

function UserInfo() {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector(state => state.user);
  console.log(loading);
  console.log(data);
  console.log(error);

  if (loading) {
    return <div>로딩중</div>;
  }
  if (error) {
    return <div>Error : {error}</div>;
  }
  return (
    <div>
      <h1>UserInfo</h1>
      <button onClick={() => dispatch(fetchUser())}>호출</button>
      <button onClick={() => dispatch(fetchUserOne())}> 개별 호출</button>
      {data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
export default UserInfo;
```
