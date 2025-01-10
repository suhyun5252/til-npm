import { useState } from "react";
import { useRecoilState } from "recoil";
import { todoListAtom } from "../atoms/todoAtom";
import TodoListSelector from "./TodoListSelector";

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
                  onClick={() => toggleTodo(item.id)}
                  style={{
                    textDecoration: item.completed ? "line-through" : "none",
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
      <TodoListSelector />
    </div>
  );
};
export default TodoAtoms;
