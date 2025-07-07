import React from "react";
import { ListGroup } from "react-bootstrap";
import { Todo } from "@/models/todo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faCircle } from "@fortawesome/free-solid-svg-icons";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle }) => {
  const isCompleted = !!todo.completed;

  return (
    <ListGroup.Item
      className="d-flex align-items-center justify-content-between"
      action
      onClick={() => onToggle(todo.id)}
      variant={isCompleted ? "success" : "light"}
      style={{ textDecoration: isCompleted ? "line-through" : undefined }}
      data-testid="task-item"
    >
      <span className="d-flex align-items-center">
        <FontAwesomeIcon
          icon={isCompleted ? faCheckCircle : faCircle}
          className="me-2"
          style={{ color: isCompleted ? '#198754' : '#adb5bd', fontSize: '1.2em' }}
        />
        {todo.text}
      </span>
    </ListGroup.Item>
  );
};

export default TodoItem; 