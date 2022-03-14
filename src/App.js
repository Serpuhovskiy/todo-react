import React, { useRef, useState } from 'react';
import Button from './components/Button';
import TodoItem from './components/TodoItem';

const todos = [
  { text: 'Задача №1', isChecked: true },
  { text: 'Задача №2', isChecked: false },
  { text: 'Задача №3', isChecked: false },
  { text: 'Задача №4', isChecked: true },
];

function App() {
  let mas = JSON.parse(localStorage.getItem('Todos'));
  if (mas === null) {
    localStorage.setItem('Todos', JSON.stringify(todos));
    mas = JSON.parse(localStorage.getItem('Todos'));
  }
  const [todoItems, setTodoItems] = useState(mas);

  const [searchValue, setSearchValue] = useState('');

  const inputRef = useRef();

  const addTodoItem = () => {
    if (!!inputRef.current.value === true) {
      let value = {
        text: inputRef.current.value,
        isChecked: false,
      };
      setTodoItems([...todoItems, value]);
      localStorage.setItem('Todos', JSON.stringify([...todoItems, value]));
      inputRef.current.value = '';
    } else alert('Введите задачу!');
  };

  const removeTodo = (index) => {
    let currentTodos = todoItems.map((el) => ({ ...el }));
    currentTodos.splice(index, 1);
    setTodoItems(currentTodos);
    localStorage.setItem('Todos', JSON.stringify(currentTodos));
  };

  const checkTodo = (flag, index) => {
    let currentTodos = todoItems.map((el) => ({ ...el }));
    currentTodos[index].isChecked = flag;
    setTodoItems(currentTodos);
    localStorage.setItem('Todos', JSON.stringify(currentTodos));
  };

  const onSearchTodo = (e) => {
    setSearchValue(e.target.value);
  };
  return (
    <div className="container">
      <div className="todo">
        <div className="todo__title">
          <h1>TODO List</h1>
          <div className="todo__search">
            <input
              className="todo__search-input"
              placeholder="Поиск по задачам"
              type="text"
              onInput={onSearchTodo}
              value={searchValue}
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
            {todoItems
              .filter((el) => el.text.toLowerCase().includes(searchValue))
              .map((el, index) => (
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
