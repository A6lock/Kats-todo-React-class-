/* eslint-disable class-methods-use-this */
/* eslint-disable no-restricted-globals */
/* eslint-disable indent */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import NewTaskForm from '../newTaskForm/newTaskForm';
import TaskList from '../taskList/taskList';
import Footer from '../footer/footer';

import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: JSON.parse(localStorage.getItem('todoData')) || [],
      filter: 'All',
    };
  }

  onEdit = (id) => {
    this.setState(({ data }) => ({
      data: data.map((item) => (item.id === id ? { ...item, editing: !item.editing } : item)),
    }));
  };

  onEditTaskForm = (id, newText) => {
    this.setState(({ data }) => ({
      data: data.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            editing: !item.editing,
            text: newText,
          };
        }
        return item;
      }),
    }));
  };

  onDelete = (id) => {
    this.setState(({ data }) => ({
      data: data.filter((item) => item.id !== id),
    }));
  };

  onCompleted = (id) => {
    this.setState(({ data }) => ({
      data: data.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)),
    }));
  };

  createNewItem = (text, min, sec) => {
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

  onChangeTimerRunning = (id) => {
    this.setState(({ data }) => {
      const newData = data.map((item) => {
        if (item.id === id) {
          return { ...item, timerRunning: !item.timerRunning };
        }
        return item;
      });
      return { data: newData };
    });
  };

  onCreate = (text, min, sec) => {
    const { data } = this.state;

    const newTask = this.createNewItem(text, min, sec);

    const newArr = [...data, newTask];

    this.setState(() => ({
      data: newArr,
    }));
  };

  onFilterChange = (filterName) => {
    this.setState({ filter: filterName });
  };

  // eslint-disable-next-line class-methods-use-this
  filteredData = (data, filterName) => {
    switch (filterName) {
      case 'Active':
        return data.filter((item) => !item.completed);
      case 'Completed':
        return data.filter((item) => item.completed);

      default:
        return data;
    }
  };

  onClearCompleted = () => {
    this.setState(({ data }) => {
      return { data: data.filter((item) => item.completed === false) };
    });
  };

  onTimeChange = (id, min, sec) => {
    this.setState(({ data }) => ({
      data: data.map((item) => (id === item.id ? { ...item, minValue: min, secValue: sec } : { ...item })),
    }));
  };

  render() {
    const { data, filter } = this.state;
    const visibleData = this.filteredData(data, filter);
    const completedItemCount = data.filter((item) => item.completed).length;

    localStorage.setItem('todoData', JSON.stringify(data));

    return (
      <section className="todoapp">
        <NewTaskForm onCreate={this.onCreate} />
        <TaskList
          data={visibleData}
          onEdit={this.onEdit}
          onEditTaskForm={this.onEditTaskForm}
          onDelete={this.onDelete}
          onComplete={this.onCompleted}
          onChangeTimerRunning={this.onChangeTimerRunning}
          onTimeChange={this.onTimeChange}
        />
        <Footer
          completedItemCount={completedItemCount}
          onFilterChange={this.onFilterChange}
          filter={filter}
          onClearCompleted={this.onClearCompleted}
        />
      </section>
    );
  }
}
