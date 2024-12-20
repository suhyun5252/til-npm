# react-icons

## 1. 설치

- [npm](https://www.npmjs.com/package/react-icons)
- [Site](https://react-icons.github.io/react-icons/)
- `npm i react-icons`

## 2. 참조

- [참조블로그](https://velog.io/@chaevivi/React-React-Icons-%EC%82%AC%EC%9A%A9%EB%B2%95)

## 3. 활용

- App.jsx

```jsx
import { BsStarFill } from "react-icons/bs";
function App() {
  const point = 5; //총별점
  const rate = 3; //별점
  return (
    <>
      <div>
        <BsStarFill style={{ color: "yellowgreen", fontSize: 50 }} />
      </div>
      <h1>당신의 별점은 </h1>
      <div>
        {/* Array 배열 만들어줌 */}
        {[...Array(point)].map((item, index) => {
          return (
            <BsStarFill
              key={index}
              style={{ color: index < rate ? "gold" : "gray" }}
            ></BsStarFill>
          );
        })}
      </div>
    </>
  );
}
export default App;
```
