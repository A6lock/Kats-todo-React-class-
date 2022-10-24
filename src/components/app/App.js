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

  edit = (id) => {
    this.setState(({ data }) => {
      const newData = data.map((item) => {
        if (item.id === id && !item.completed) {
          item.editing = !item.editing;
        }
        return item;
      });
      return newData;
    });
  };

  onEditTaskForm = (id, newText) => {
    this.setState(({ data }) => {
      const newArr = data.map((item) => {
        if (item.id === id) {
          item.text = newText;
          item.editing = !item.editing;
        }
        return item;
      });
      return newArr;
    });
  };

  delete = (id) => {
    this.setState(({ data }) => ({
      data: data.filter((item) => item.id !== id),
    }));
  };

  completed = (id) => {
    this.setState(({ data }) => {
      const newArr = data.map((item) => {
        if (item.id === id) {
          item.completed = !item.completed;
        }
        return item;
      });
      return newArr;
    });
  };

  create = (text) => {
    const { data } = this.state;

    const newElem = {
      text,
      completed: false,
      editing: false,
      id: this.maxId++,
      creationTime: new Date(),
    };

    const newArr = [data, newElem];

    this.setState({ data: newArr });
  };

  onFilterChange = (filterName) => {
    this.setState({ filter: filterName });
  };

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

  clearCompleted = () => {
    this.setState(({ data }) => {
      return data.filter((item) => !item.completed);
    });
  };

  render() {
    const { data, filter } = this.state;

    const visibleData = this.filteredData(data, filter);
    const completedItemCount = data.filter((item) => item.completed).length;
    return (
      <section className="todoapp">
        <NewTaskForm onCreate={this.create} />
        <TaskList
          data={visibleData}
          onEdit={this.edit}
          onEditTaskForm={this.onEditTaskForm}
          onDelete={this.delete}
          onComplete={this.completed}
        />
        <Footer
          completedItemCount={completedItemCount}
          onFilterChange={this.onFilterChange}
          filter={filter}
          onClearCompleted={this.clearCompleted}
        />
      </section>
    );
  }
}
