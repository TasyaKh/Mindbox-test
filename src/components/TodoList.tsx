import { Todo } from "@/models/todo";
import React from "react";
import { ListGroup } from "react-bootstrap";
import TodoItem from "./TodoItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons/faExclamationCircle";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle }) => {
  return (
    <ListGroup>
      {todos.length === 0 && (
        <ListGroup.Item className="text-center bg-light d-inline d-flex  align-items-center">
          <FontAwesomeIcon
            icon={faExclamationCircle}
            color="orange"
            size="xl"
          />
          <div className="mx-2">Нет задач</div>
        </ListGroup.Item>
      )}
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />
      ))}
    </ListGroup>
  );
};

export default TodoList;
