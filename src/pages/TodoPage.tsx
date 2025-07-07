import React, { useState, useMemo } from "react";
import { Container, Row, Col, ButtonGroup, Button } from "react-bootstrap";
import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";
import { Todo } from "@/models/todo";

export enum TodoFilter {
  All = "all",
  Active = "active",
  Completed = "completed",
}

const TodoPage: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState<TodoFilter>(TodoFilter.All);

  const handleAdd = () => {
    if (input.trim()) {
      setTodos([
        ...todos,
        { id: Date.now(), text: input.trim(), completed: false },
      ]);
      setInput("");
    }
  };

  const handleToggle = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleClearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const { filteredTodos, remaining, hasCompleted } = useMemo(() => {
    let remaining = 0;
    let hasCompleted = false;

    const filteredTodos = todos.filter((todo) => {
      const isCompleted = todo.completed;

      if (!isCompleted) remaining++;
      else hasCompleted = true;

      if (filter === TodoFilter.All) return true;
      if (filter === TodoFilter.Active) return !isCompleted;
      if (filter === TodoFilter.Completed) return isCompleted;

      return true;
    });

    return { filteredTodos, remaining, hasCompleted };
  }, [todos, filter]);

  return (
    <Container className="py-4">
      <div style={{ maxWidth: "500px", margin: "0 auto" }}>
        <h2 className="h2">Список задач</h2>

        <div className="mb-3" style={{ maxWidth: 600 }}>
          <TodoInput value={input} onChange={setInput} onAdd={handleAdd} />
        </div>

        <div className="mb-3" style={{ maxWidth: 600 }}>
          <ButtonGroup className="mb-2">
            <Button
              variant={
                filter === TodoFilter.All ? "secondary" : "outline-secondary"
              }
              onClick={() => setFilter(TodoFilter.All)}
            >
              Общий
            </Button>
            <Button
              variant={
                filter === TodoFilter.Active ? "secondary" : "outline-secondary"
              }
              onClick={() => setFilter(TodoFilter.Active)}
            >
              Невыполненные
            </Button>
            <Button
              variant={
                filter === TodoFilter.Completed
                  ? "secondary"
                  : "outline-secondary"
              }
              onClick={() => setFilter(TodoFilter.Completed)}
            >
              Выполненные
            </Button>
          </ButtonGroup>

          <TodoList todos={filteredTodos} onToggle={handleToggle} />
        </div>

        <div
          className="d-flex justify-content-between align-items-center"
          style={{ maxWidth: 600 }}
        >
          <div>
            Осталось задач: <b>{remaining}</b>
          </div>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={handleClearCompleted}
            disabled={!hasCompleted}
            data-testid="clear-completed-btn"
          >
            Очистить выполненные
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default TodoPage;
