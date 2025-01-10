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
