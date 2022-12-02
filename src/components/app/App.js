/* eslint-disable class-methods-use-this */
/* eslint-disable no-restricted-globals */
/* eslint-disable indent */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import NewTaskForm from '../newTaskForm/newTaskForm';
import TaskList from '../taskList/taskList';
import Footer from '../footer/footer';

import './App.css';

function App() {
  const [data, setData] = useState(JSON.parse(localStorage.getItem('todoData')) || []);
  const [filter, setFilter] = useState('All');

  const onEdit = (id) => {
    setData((data) => data.map((item) => (item.id === id ? { ...item, editing: !item.editing } : item)));
  };

  const onEditTaskForm = (id, newText) => {
    setData((data) => data.map((item) => (item.id === id ? { ...item, editing: !item.editing, text: newText } : item)));
  };

  const onDelete = (id) => {
    setData((data) => data.filter((item) => item.id !== id));
  };

  const onCompleted = (id) => {
    setData(data.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)));
  };

  const onChangeTimerRunning = (id) => {
    setData((data) => {
      return data.map((item) => {
        if (item.id === id) {
          return { ...item, timerRunning: !item.timerRunning };
        }
        return item;
      });
    });
  };

  const createNewItem = (text, min, sec) => {
    const minNumber = !min || isNaN(min) ? 12 : min;
    const secNumber = !sec || isNaN(sec) ? 25 : sec;

    return {
      text,
      completed: false,
      editing: false,
      id: uuidv4(),
      creationTime: new Date(),
      minValue: minNumber,
      secValue: secNumber,
      timerRunning: false,
    };
  };

  const onCreate = (text, min, sec) => {
    const newTask = createNewItem(text, min, sec);

    const newArr = [...data, newTask];

    setData(newArr);
  };

  const onFilterChange = (filterName) => {
    setFilter(filterName);
  };

  const filteredData = (data, filterName) => {
    switch (filterName) {
      case 'Active':
        return data.filter((item) => !item.completed);
      case 'Completed':
        return data.filter((item) => item.completed);

      default:
        return data;
    }
  };

  const onClearCompleted = () => {
    setData((data) => data.filter((item) => item.completed === false));
  };

  const onTimeChange = (id, min, sec) => {
    setData((data) => data.map((item) => (id === item.id ? { ...item, minValue: min, secValue: sec } : { ...item })));
  };

  const visibleData = filteredData(data, filter);
  const completedItemCount = data.filter((item) => item.completed).length;

  localStorage.setItem('todoData', JSON.stringify(data));

  return (
    <section className="todoapp">
      <NewTaskForm onCreate={onCreate} />
      <TaskList
        data={visibleData}
        onEdit={onEdit}
        onEditTaskForm={onEditTaskForm}
        onDelete={onDelete}
        onComplete={onCompleted}
        onChangeTimerRunning={onChangeTimerRunning}
        onTimeChange={onTimeChange}
      />
      <Footer
        completedItemCount={completedItemCount}
        onFilterChange={onFilterChange}
        filter={filter}
        onClearCompleted={onClearCompleted}
      />
    </section>
  );
}

export default App;
