import './Country.css'

import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom';

const Country = (props) => {

  const Data = props.data;
  const ListData = [
    {property: "Capital", value: Data.capital},
    {property: "Population", value: Data.population},
    {property: "Region", value: Data.region},
  ]

  const state = useSelector(val => val.mode);

  const countryClasses = `hoverable country border-radius dark-shadow ${state ? 'light-element' : 'dark-element'}`

  const ListElements = ListData.map(element =>
    <div className="element">
      <p className="fw-regular fs-1">{element.property + ":"}</p>
      <p className="fs-1">{element.value}</p>
    </div>
  )

  return (
    <Link to={'detail/' + Data.cca3} style={{width: '100%'}}>
      <div className={countryClasses}>

        <div className="image">
          <img className="normal-img" atl="country" src={Data.flags.png} />
          {/* <img className="blurred-img" src={Data.flags.png} /> */}
        </div>

        <div className="description">

          <h1 className="fw-regular fs-1">{Data.name.common}</h1>

          <div className="list">
            {ListElements}
          </div>

        </div>

      </div>
    </Link>
  )
}

export default Country
