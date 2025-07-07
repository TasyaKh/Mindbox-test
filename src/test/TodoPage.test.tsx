import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoPage from '../pages/TodoPage';

describe('TodoPage', () => {
  it('adds a new task', async () => {
    render(<TodoPage />);
    const input = screen.getByTestId('new-task-input');
    const addButton = screen.getByTestId('add-btn');   
    await userEvent.type(input, 'Test Task');
    await userEvent.click(addButton);
    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });

  it('mark task as completed', async () => {
    render(<TodoPage />);
    const input = screen.getByTestId('new-task-input');   
    const addButton = screen.getByTestId('add-btn');   
    await userEvent.type(input, 'Toggle Task');
    await userEvent.click(addButton);
    const task = screen.getByTestId('task-item');
    await userEvent.click(task);
    expect(task).toHaveStyle('text-decoration: line-through');
    await userEvent.click(task);
    expect(task).not.toHaveStyle('text-decoration: line-through');
  });

  it('clears completed todos', async () => {
    render(<TodoPage />);
    const input = screen.getByTestId('new-task-input');
    const addButton = screen.getByTestId('add-btn');
    // Add two tasks
    await userEvent.type(input, 'Task 1');
    await userEvent.click(addButton);
    await userEvent.type(input, 'Task 2');
    await userEvent.click(addButton);
    // Complete both
    let task1 = screen.getByText('Task 1');
    let task2 = screen.getByText('Task 2');
    await userEvent.click(task1);
    await userEvent.click(task2);
    // Clear completed
    const clearButton = screen.getByTestId('clear-completed-btn');
    await userEvent.click(clearButton);
    expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Task 2')).not.toBeInTheDocument();
  });

  it('shows warning icon and text when no todos', () => {
    render(<TodoPage />);
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
    expect(screen.getByText('Нет задач')).toBeInTheDocument();
  });
}); 