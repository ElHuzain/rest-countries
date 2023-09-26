import './Button.css'

import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

const Button = (props) => {

  const state = useSelector(state => state.mode);

  const Icon = props.icon;

  const classes = `hoverable border-radius button dark-shadow ${state ? 'light-element' : 'dark-element'}`
  const fontClass = `fw-thin fs-1 ${state ? 'light-text' : 'dark-text'}`
  const IconClass = state ? 'light-text' : 'dark-text';

  return (
    <Link style={{width: 'fit-content', margin: 'auto 0'}} to={props.to}>
      <button className={classes}>
        <Icon className={IconClass}/><p className={fontClass}>{props.text}</p>
      </button>
    </Link>
  )
}

export default Button