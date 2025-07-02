import { useState } from "react";
import "./App.css"; // 필요에 따라 CSS 추가 가능

function App() {
  const [todoList, setTodoList] = useState([
    { id: crypto.randomUUID(), content: "코딩 공부하기", completed: false },
    { id: crypto.randomUUID(), content: "잠 자기", completed: false },
  ]);

  return (
    <div style={styles.container}>
      <h1>📝 To-Do List</h1>
      <TodoInput setTodoList={setTodoList} />
      <hr />
      <TodoList todoList={todoList} setTodoList={setTodoList} />
    </div>
  );
}

function TodoInput({ setTodoList }) {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    if (!inputValue.trim()) return;
    const newTodo = {
      id: crypto.randomUUID(),
      content: inputValue,
      completed: false,
    };
    setTodoList((prev) => [...prev, newTodo]);
    setInputValue("");
  };

  return (
    <div style={styles.inputArea}>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="할 일을 입력하세요"
        style={styles.input}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
      />
      <button onClick={handleAdd} style={styles.addButton}>추가</button>
    </div>
  );
}

function TodoList({ todoList, setTodoList }) {
  return (
    <ul style={styles.list}>
      {todoList.map((todo) => (
        <Todo key={todo.id} todo={todo} setTodoList={setTodoList} />
      ))}
    </ul>
  );
}

function Todo({ todo, setTodoList }) {
  const [inputValue, setInputValue] = useState(todo.content);

  const handleToggle = () => {
    setTodoList((prev) =>
      prev.map((el) =>
        el.id === todo.id ? { ...el, completed: !el.completed } : el
      )
    );
  };

  const handleUpdate = () => {
    if (!inputValue.trim()) return;
    setTodoList((prev) =>
      prev.map((el) =>
        el.id === todo.id ? { ...el, content: inputValue } : el
      )
    );
  };

  const handleDelete = () => {
    setTodoList((prev) => prev.filter((el) => el.id !== todo.id));
  };

  return (
    <li style={styles.listItem}>
      <input type="checkbox" checked={todo.completed} onChange={handleToggle} />
      <span
        style={{
          ...styles.todoText,
          textDecoration: todo.completed ? "line-through" : "none",
          color: todo.completed ? "#999" : "#000",
        }}
      >
        {todo.content}
      </span>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={styles.editInput}
      />
      <button onClick={handleUpdate} style={styles.editButton}>수정</button>
      <button onClick={handleDelete} style={styles.deleteButton}>삭제</button>
    </li>
  );
}

const styles = {
  container: { maxWidth: "500px", margin: "0 auto", padding: "1rem" },
  inputArea: { display: "flex", gap: "0.5rem", marginBottom: "1rem" },
  input: { flex: 1, padding: "0.5rem" },
  addButton: { padding: "0.5rem 1rem" },
  list: { listStyle: "none", padding: 0 },
  listItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginBottom: "0.5rem",
  },
  todoText: { flex: 1 },
  editInput: { flex: 1, padding: "0.3rem" },
  editButton: {
    padding: "0.3rem 0.6rem",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  deleteButton: {
    padding: "0.3rem 0.6rem",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default App;
// 위 코드는 React를 사용하여 간단한 To-Do List 애플리케이션을 구현한 것입니다.
// 사용자는 할 일을 추가하고, 완료 상태를 토글하며, 수정 및 삭제할 수 있습니다.
// 각 할 일은 고유한 ID를 가지며, 입력 필드와 버튼을 통해 상호작용할 수 있습니다.
// 스타일은 인라인 스타일링을 사용하여 간단하게 적용하였습니다.
// 필요에 따라 CSS 파일을 추가하여 스타일을 개선할 수 있습니다.
// 이 코드는 React의 상태 관리와 이벤트 핸들링을 활용하여 동적인 사용자 인터페이스를 제공합니다.
