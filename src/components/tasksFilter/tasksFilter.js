import { Component } from "react";

import './tasksFilter.css';

export default class TaskFilter extends Component {

  constructor(props) {
    super(props);

    this.state = {
      filterData: [
        {name: 'All'},
        {name: 'Active'},
        {name: 'Completed'},
      ]
    }
    
  }

  render() {

    const {filterData} = this.state;

    const {filter, onFilterChange} = this.props;

    const filters = filterData.map((item) => {

      const {name} = item;

      const buttonClass = name === filter ? 'selected' : '';

      return (
        <li key={name}>
          <button 
            type="button" 
            className={buttonClass}
            onClick={() => onFilterChange(name)}
            >  
              {name}
          </button>
        </li>
      )
    })

    return(
          <ul className="filters">
            {filters}
          </ul>
    )
  }
}