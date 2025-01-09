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
