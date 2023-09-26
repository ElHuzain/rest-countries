import './Filter.css'

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { MdExpandMore, MdExpandLess } from 'react-icons/md';

const FilterList = (props) => {

  const filterClasses = `filter-list border-radius dark-shadow ${props.state ? 'light-element' : 'dark-element'}`

  const elementClass = `element hoverable border-radius ${props.state ? 'light-bg' : 'dark-element'}`

  const updatedElements = ['ALL', ...props.elements];

  const elems = updatedElements.map(element =>
    <div onClick={() => props.func(element)} className={elementClass}>{element}</div>
  )

  return (
    <div className={filterClasses}>
      {elems}
    </div>
  )
}

const Filter = (props) => {
  const [open, setOpen] = useState(false);

  const state = useSelector(val => val.mode);
  const dispatcher = useDispatch();

  const filterClasses = `filter border-radius dark-shadow ${state ? 'light-element' : 'dark-element'}`

  const state2 = useSelector(val => val.filter);
  function dispatch(value) {
    dispatcher({type: 'updateFilter', payload: {type: props.type, value}});
  }

  function openFilter() {
    setOpen(!open);
  }

  const expandIcon = open ? <MdExpandLess className="icon hoverable" size="25" /> : <MdExpandMore className="icon hoverable" size="25" />

  return (
    <div onClick={openFilter} className={filterClasses}>
      <p className='fs-1 fw-thin hoverable text'>Filter by {props.type} </p>{expandIcon}
      {open && <FilterList func={dispatch} elements={props.elements} state={state} />}
    </div>
  )
}

export default Filter
