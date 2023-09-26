import './Header.css'

import { useSelector, useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';
import { FaMoon } from 'react-icons/fa';
import {FaEarthAmericas} from 'react-icons/fa6';

const Header = () => {
  const val = useSelector(val => val.mode);
  const dispatcher = useDispatch();

  const switchMode = () => {
    dispatcher({ type: 'switch' });
  }

  const classes = `header dark-shadow ${val ? '' : ''}`

  const headerStyle = {
    backgroundColor: val ? 'var(--light-bg)' : 'var(--dark-element)'
  }

  return (
    <header style={headerStyle} className={classes}>
      <div className="logo"><Link to='/'><h1 className="fs-5 fw-bold">Where in the W<FaEarthAmericas size="14"/>rld?</h1></Link></div>
      <div onClick={switchMode} className="mode-switch">
        {
          val
            ? <><FaMoon className="icon" /> <p className="hoverable fw-regular icon">Dark Mode</p></>
            : <><FaMoon className="icon" /> <p className="hoverable fw-regular icon">Light Mode</p></>
        }
      </div>
    </header>
  )
}

export default Header
