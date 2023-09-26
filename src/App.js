import './styles/reset.css'
import './styles/variables.css'
import './styles/styles.css'

import { Routes, Route } from 'react-router-dom';

import Header from './Components/Header/Header';

import DetailPage from './Pages/Detailpage/DetailPage'
import HomePage from './Pages/Homepage/HomePage';

import { useSelector } from 'react-redux';

// Temp Imports

import Search from './Components/Search/Search';
import Button from './Components/Button/Button';
import Country from './Components/Country/Country';
import Filter from './Components/Filter/Filter';

function App() {


  const mode = useSelector(state => state.mode)

  console.log(mode);

  const classes = `color-transition root ${mode ? 'light-bg light-text' : 'dark-bg dark-text'}`

  return (
    <div className={classes}>

      <div id="container" >
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/detail/:cca3' element={<DetailPage />} />
        </Routes>

      </div>

    </div>
  );
}

export default App;