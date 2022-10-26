/* eslint-disable indent */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import { Component } from 'react';

import NewTaskForm from '../newTaskForm/newTaskForm';
import TaskList from '../taskList/taskList';
import Footer from '../footer/footer';

import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        {
          text: 'Completed task',
          completed: false,
          editing: false,
          id: 1,
          creationTime: new Date(),
        },
        {
          text: 'Editing task',
          completed: false,
          editing: false,
          id: 2,
          creationTime: new Date(),
        },
        {
          text: 'Active task',
          completed: false,
          editing: false,
          id: 3,
          creationTime: new Date(),
        },
      ],
      filter: 'All',
    };

    this.maxId = 4;
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

  createNewItem = (text) => {
    return {
      text,
      completed: false,
      editing: false,
      id: this.maxId++,
      creationTime: new Date(),
    };
  };

  onCreate = (text) => {
    const { data } = this.state;

    const newTask = this.createNewItem(text);

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

  render() {
    const { data, filter } = this.state;
    const visibleData = this.filteredData(data, filter);
    const completedItemCount = data.filter((item) => item.completed).length;
    return (
      <section className="todoapp">
        <NewTaskForm onCreate={this.onCreate} />
        <TaskList
          data={visibleData}
          onEdit={this.onEdit}
          onEditTaskForm={this.onEditTaskForm}
          onDelete={this.onDelete}
          onComplete={this.onCompleted}
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
