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
