import React from "react";
import { Form, Button } from "react-bootstrap";

interface TodoInputProps {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ value, onChange, onAdd }) => (
  <Form
    onSubmit={e => {
      e.preventDefault();
      onAdd();
    }}
    className="d-flex gap-2"
  >
    <Form.Control
      type="text"
      placeholder="Новая задача"
      value={value}
      data-testid="new-task-input"
      onChange={e => onChange(e.target.value)}
    />
    <Button data-testid="add-btn" type="submit" variant="primary">
      Добавить
    </Button>
  </Form>
);

export default TodoInput; 