import { Component } from "react";
import { PropTypes } from "prop-types";


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

  static defaultProps = {
    onFilterChange: () => {},
    filter: 'All',
    
  }

  static propTypes = {
    onFilterChange: PropTypes.func,
    filter: PropTypes.string,
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