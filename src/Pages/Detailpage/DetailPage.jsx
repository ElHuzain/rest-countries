import './DetailPage.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Query from '../../DataFunctions';

import Button from '../../Components/Button/Button';
import { BiArrowBack } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const DetailPage = () => {
  const [state, setState] = useState(false);
  const [borders, setBorders] = useState([]);

  const mode = useSelector(val => val.mode);
  const data = useParams();


  useEffect(() => {
    const LocalData = Query.getCachedData('data');
    const countryData = LocalData.filter(elm => elm.cca3 == data.cca3);

    function getCountryFromCCA3(cca3) {
      const ret = LocalData.filter(elm => elm.cca3 == cca3)[0];
      return ret;
    }
    console.log(countryData[0].borders)
    if (countryData[0].borders) {

      const BordersArray = [];
      for (let i = 0; i < countryData[0].borders.length; i++) {
        const dm = getCountryFromCCA3(countryData[0].borders[i]);
        BordersArray.push(dm);
      }
      setBorders(BordersArray);
    }
    setState(countryData[0]);

  }, [])

  const bgColor = mode ? 'light-element' : 'dark-element'
  const DescriptionArray = state == false ? "" : [
    {
      property: 'Name',
      value: state.name.common
    },
    {
      property: 'Population',
      value: state.population
    },
    {
      property: 'Region',
      value: state.region
    },
    {
      property: 'Sub Region',
      value: state.subregion
    },
    {
      property: 'Capital',
      value: state.capital[0]
    },
    {
      property: 'Top Level Domain',
      value: state.tld[0]
    },
    {
      property: 'Currencies',
      value: state.currencies
    },
    {
      property: 'Languages',
      value: state.languages
    },
  ]

  const BordersElements = borders.length != 0
    ? borders.map(elm => {
      const style = `BorderButton border-radius hoverable dark-shadow fs-1 ${mode ? 'light-element light-text' : 'dark-element dark-text'}`
      return <p onClick={() => { setState(elm) }} className={style} to={'/detail/' + elm.cca3}>{elm.name.common}</p>
    }
    )
    : 'this country has no border countries.'

  const DescriptionElements = state == false ? '' :
    DescriptionArray.map((elm, index) => {
      let val = elm.value;
      if (typeof elm.value == 'object') {
        let first = true;
        val = '';
        for (const m in elm.value) {
          let m1 = m;
          if (elm.property == 'Languages') m1 = elm.value[m]
          const mm = first ? m1 : `, ${m1}`;
          val += mm;
          first = false;
        }
      }
      return <div key={index} className="detailpiece"><p className="fw-regular">{elm.property}:</p><p>{val}</p></div>
    })

  return (
    <div className="detailpage page">
      <Button to='/' icon={BiArrowBack} text="Back" />

      <div className="display">
        {
          state
            ? <>
              <div className={'image border-radius dark-shadow ' + bgColor}>
                <img alt="country flag" src={state.flags.png} />
              </div>
              <div className="description">
                <div className="name fw-regular fs-4">{state.name.common}</div>
                <div className="list">{DescriptionElements}</div>
                <div className="border"><p style={{ margin: 'auto 0' }} className="fw-bold">Border Countries:</p> {BordersElements}</div>
              </div>
            </>
            : <p>Loading Data..</p>
        }
      </div>

    </div>
  )
}

export default DetailPage
