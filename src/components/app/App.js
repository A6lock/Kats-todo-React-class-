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
        {text: 'Completed task',completed: false, editing: false, id: 1, creationTime: new Date()},
        {text: 'Editing task',completed: false, editing: false, id: 2, creationTime: new Date()},
        {text: 'Active task',completed: false, editing: false, id: 3, creationTime: new Date()},
      ],
      completedTask: 0,
      filter: 'All',
    }

    this.maxId = 4;
  }

  edit = (id) => {
    const newArr = this.state.data.map((element) => {

      if(element.id === id && !element.completed) {
        element.editing = !element.editing; 
      }

      return element;

    });

    this.setState({data: newArr});
  }

  onEditTaskForm = (id, newText) => {
    const newArr = this.state.data.map(element => {
      
      if(element.id === id) {
        element.text = newText; 
        element.editing = !element.editing;
      }

      return element

    })

    this.setState({data: newArr})
  }

  delete = (id) => {
    
    this.setState(({data}) => {
      return {
        data: data.filter(element => element.id !== id)
      }
    })
  }

  completed = id => {

    const newArr = this.state.data.map((element) => {

      if(element.id === id) {
        element.completed = !element.completed; 
      }

      return element;

    });

    this.isCompleted();

    this.setState({data: newArr});
  }

  create = (text) => {
    const newElem = {
      text: text,
      completed: false,
      editing: false,
      id: this.maxId++,
      creationTime: new Date()
    };

    const newData = [...this.state.data, newElem];

    this.setState({data: newData})
  }

  isCompleted = () => {
    const completedTask = this.state.data.filter(item => item.completed);

    this.setState({completedTask: completedTask.length});
  }

  onFilterChange = (filterName) => {
    this.setState({filter: filterName})
  }

  filteredData = (data, filterName) => {
    switch(filterName) {
      case 'Active':
        return data.filter(item => !item.completed);
      case 'Completed':
        return data.filter(item => item.completed);

      default:
        return data;
    };

  }
  
  clearCompleted = () => {
    const newArr = this.state.data.filter(element => !element.completed )

    this.setState({data: newArr})
  }


  render() {

    const visibleData = this.filteredData(this.state.data, this.state.filter)

    return (
      <section className='todoapp'>
        <NewTaskForm 
          onCreate={this.create}/>
        <TaskList 
          data={visibleData}
          onEdit={this.edit}
          onEditTaskForm={this.onEditTaskForm}
          onDelete={this.delete}
          onComplete={this.completed}/>
        <Footer 
          isCompleted={this.state.completedTask}
          isActive={() => console.log(`give active data`)}
          onFilterChange={this.onFilterChange}
          filter={this.state.filter}
          onClearCompleted={this.clearCompleted}/>
      </section>
    );
  }
}
