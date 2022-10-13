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
        {text: 'Completed task',completed: false, id: 1},
        {text: 'Editing task',completed: false, id: 2},
        {text: 'Active task',completed: false, id: 3},
      ]
    }
  }

  edit = (id) => {
    console.log(id, 'edit')
  }

  delete = (id) => {
    const newArr = this.state.data.filter(element => element.id !== id);

    this.setState({
      data: newArr
    })
  }

  completed = id => {

    const newArr = this.state.data.map((element, {completed}) => {

      if(element.id === id) {
        element.completed = !element.completed; 
      }

      return element;

    });

    this.setState(({data}) => ({data: newArr}))

  }



  render() {
    return (
      <section className='todoapp'>
        <NewTaskForm />
        <TaskList 
        data={this.state.data}
        onEdit={this.edit}
        onDelete={this.delete}
        onComplete={this.completed}/>
        <Footer />
      </section>
    );
  }
}
