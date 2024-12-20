# 날짜를 다루는 라이브러리

- 참고) [html 특수기호](https://dev-handbook.tistory.com/23)

## 1. moment

### 1.1 설치

- [npm 설치](https://www.npmjs.com/package/moment)
- [site](https://momentjs.com/)
- `npm i moment`

### 1.2 참조

- [활용참조](https://bolob.tistory.com/entry/JavaScript-Momentjs-%EC%82%AC%EC%9A%A9%EB%B2%95-%ED%98%84%EC%9E%AC-%EB%82%A0%EC%A7%9C-%EB%82%A0%EC%A7%9C-%ED%8F%AC%EB%A7%B7-%EB%82%A0%EC%A7%9C-%EB%B9%84%EA%B5%90)

### 1.3 활용예

- App.jsx

```jsx
import moment from "moment";

// 서버에서 Response 된 데이터
const getData = [
  { id: 1, title: "swagger 완료", createAt: "2024-12-10T10:00:00Z" },
  {
    id: 2,
    title: "react 완료",
    createAt: "2024-12-18T10:00:00Z",
  },
];
function App() {
  // 오늘의 날짜
  const todayMomnet = moment().format("YYYY-MM-DD");
  return (
    <div>
      <h1>moment 활용 날자관련</h1>
      <div>
        <p>오늘은 {todayMomnet}</p>
        <p>
          {getData.map(item => {
            return (
              <p key={item.id}>
                아이디 :{item.id} 제목 : {item.title} 날짜 :
                {moment(item.createAt).format("YYYY-MM-DD")}
              </p>
            );
          })}

          <h2>moment 를 활용한 5일 뒤 날짜</h2>
          {getData.map(item => {
            return (
              <p key={item.id}>
                아이디 :{item.id} 제목 : {item.title} 5일 후 날짜 : &nbsp;
                {moment(item.createAt).add(5, "days").format("YYYY-MM-DD")}
              </p>
            );
          })}
          <h3>moment 를 활용한 시간이 얼마나 지났는지 ?</h3>
          {getData.map(item => {
            return (
              <p key={item.id}>
                아이디 :{item.id} 제목 : {item.title} 며칠째? : &nbsp;
                {moment(item.createAt).fromNow()}
              </p>
            );
          })}
        </p>
      </div>
    </div>
  );
}
export default App;
```

## 2. Dayjs

### 2.1 설치

- [npm 설치](https://www.npmjs.com/package/dayjs)
- [Site](https://day.js.org/)
- `npm i dayjs`

### 2.1 참조

- [활용참조](https://velog.io/@hongsoom/Library-day.js-%EB%82%A0%EC%A7%9C-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC)

-[플러그인 참조]

### 2.1 활용예

```jsx
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
// 서버에서 Response 된 데이터
const getData = [
  { id: 1, title: "swagger 완료", createAt: "2024-12-10T10:00:00Z" },
  {
    id: 2,
    title: "react 완료",
    createAt: "2024-12-18T10:00:00Z",
  },
];
function App() {
  // 오늘의 날짜
  const todayDayjs = dayjs().format("YYYY-MM-DD");
  return (
    <div>
      <h1>Dayjs 활용 날자관련</h1>
      <div>
        <p>오늘은 {todayDayjs}</p>
        <p>
          {getData.map(item => {
            return (
              <p key={item.id}>
                아이디 :{item.id} 제목 : {item.title} 날짜 :
                {dayjs(item.createAt).format("YYYY-MM-DD")}
              </p>
            );
          })}

          <h2>Dayjs 를 활용한 5일 뒤 날짜</h2>
          {getData.map(item => {
            return (
              <p key={item.id}>
                아이디 :{item.id} 제목 : {item.title} 5일 후 날짜 : &nbsp;
                {dayjs(item.createAt).add(5, "day").format("YYYY-MM-DD")}
              </p>
            );
          })}
          <h3>Dayjs 를 활용한 시간이 얼마나 지났는지 ?</h3>
          {getData.map(item => {
            return (
              <p key={item.id}>
                아이디 :{item.id} 제목 : {item.title} 며칠째? : &nbsp;
                {dayjs(item.createAt).fromNow()}
              </p>
            );
          })}
        </p>
      </div>
    </div>
  );
}
export default App;
```
