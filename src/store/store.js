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
