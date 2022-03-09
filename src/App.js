import React, { useEffect, useRef, useState } from 'react';
import Button from './components/Button';
import TodoItem from './components/TodoItem';

const todos = [
  { text: 'Изучить HTML', isChecked: true },
  { text: 'Изучить CSS', isChecked: true },
  { text: 'Изучить JS', isChecked: true },
  { text: 'Изучить React', isChecked: true },
  { text: 'Выложить на GitHub', isChecked: false },    
];


function App() {
  // localStorage.setItem('Todos', JSON.stringify(todos));
  let mas = JSON.parse(localStorage.getItem('Todos'));
  const [todoItems, setTodoItems] = useState(mas);

  const [finalTodoItems, setFinalTodoItems] = useState(todoItems);

  const inputRef = useRef();

  const addTodoItem = () => {
    let value = {
      text: inputRef.current.value,
      isChecked: false,
    };
    setTodoItems([...todoItems, value]);
    localStorage.setItem('Todos', JSON.stringify([...todoItems, value]));
    setFinalTodoItems([...todoItems, value]);
    inputRef.current.value = '';
  };

  const removeTodo = (index) => {
    let currentTodos = todoItems.map((el) => ({ ...el }));
    currentTodos.splice(index, 1);
    setTodoItems(currentTodos);
    localStorage.setItem('Todos', JSON.stringify(currentTodos));
    setFinalTodoItems(currentTodos);
  };

  const checkTodo = (flag, index) => {
    console.log(`Number ${index} checked: ${flag}`);
    let currentTodos = todoItems.map((el) => ({ ...el }));
    currentTodos[index].isChecked = flag;
    console.log(currentTodos);
    setTodoItems(currentTodos);
    localStorage.setItem('Todos', JSON.stringify(currentTodos));
    setFinalTodoItems(currentTodos);
  };

  const onSearchTodo = (e) => {
    const value = e.target.value.toLowerCase();
    let foundItems = todoItems.filter((item) => item.text.toLowerCase().includes(value));
    console.log(foundItems);
    setFinalTodoItems(foundItems);
  };
  return (
    <div className="container">
      <div className="todo">
        <div className="todo__title">
          <h1>TODO List</h1>
          <div className="todo__search">
            <input
              className="todo__search-input"
              placeholder="Поиск"
              type="text"
              onInput={onSearchTodo}
            />
          </div>
        </div>

        <div className="todo__add">
          <form action="" className="todo__form">
            <input
              className="todo__input"
              type="text"
              placeholder="Введите задачу"
              ref={inputRef}
            />
            <Button onClick={addTodoItem} className="todo__button">
              Добавить todo
            </Button>
          </form>
        </div>

        <div className="todo__items">
          <ul className="todo__list">
            {finalTodoItems.map((el, index) => (
              <TodoItem
                key={`${el.text}_${index}`}
                text={el.text}
                removeTodo={() => removeTodo(index)}
                isChecked={el.isChecked}
                checkTodo={(isChecked) => checkTodo(isChecked, index)}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
