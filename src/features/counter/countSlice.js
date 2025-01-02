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
