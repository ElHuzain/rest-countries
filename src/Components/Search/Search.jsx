import './Search.css'

import { BsSearch } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';

const Search = () => {

  const state = useSelector(state => state);
  const dispatcher = useDispatch();

  function updateSearch(e) {
    const value = e.target.value;
    dispatcher({ type: 'updateSearch', payload: value })
  }

  const mode = state.mode;
  const searchState = state.search;

  const searchClasses = `border-radius search dark-shadow ${mode ? 'light-element' : 'dark-element'}`

  return (
    <div className={searchClasses}>
      <BsSearch className="icon" size="25" />
      <input value={searchState} onChange={updateSearch} placeholder='Search by name..' className={mode ? "light-input" : "dark-text"} />
    </div>
  )

}

export default Search
