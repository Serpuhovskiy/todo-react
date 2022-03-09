import React from 'react';
import Button from './Button';

function TodoItem({ text, removeTodo, checkTodo, isChecked }) {
  const handleCheck = (e) => {
    checkTodo(e.target.checked);
  }
  return (
    <li className="todo__item">
      <label className="todo__item-label">
        <input onChange={handleCheck} className="todo__item-input" type="checkbox" checked={isChecked} />
        <span className="todo__item-checkbox"></span>
        {text}
      </label>
      <Button onClick={removeTodo} className="todo__item-btn" />
    </li>
  );
}

export default TodoItem;
