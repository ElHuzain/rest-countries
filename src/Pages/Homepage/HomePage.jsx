import './HomePage.css';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Search from '../../Components/Search/Search';
import Filter from '../../Components/Filter/Filter';
import Button from '../../Components/Button/Button';
import Country from '../../Components/Country/Country';

import Query from '../../DataFunctions';

const HomePage = () => {
  const [countryData, setCountryData] = useState([]);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const mode = useSelector(val => val.mode);
  const data = useSelector(val => val.data);
  const filterState = useSelector(val => val.filter);
  const searchState = useSelector(val => val.search);

  const dispatcher = useDispatch();

  const pageLength = 25;
  const NumOfPages = Math.floor(data.length / pageLength);

  useEffect(() => {

    async function asyncFunc() {

      const LocalData = await Query.getCachedData('data');

      if (LocalData == 'null' || LocalData == null) {
        console.log("Fetching New Data..");
        const Data = await Query.fetchDataFromAPI('https://restcountries.com/v3.1/all');
        await Query.cacheData('data', Data);
        setCountryData(data);
      } else setCountryData(LocalData);
    }

    if (countryData.length == 0) asyncFunc();

    else {
      let searchFilter = false;
      let resultArray = Query.copyArray(countryData);
      if (filterState.Language != 'all' && filterState.Language != 'ALL') {
        resultArray = Query.searchByLanguage(resultArray, filterState.Language);
        searchFilter = true;
      }

      if (filterState.Region != 'all' && filterState.Region != 'ALL') {
        resultArray = Query.searchByRegion(resultArray, filterState.Region);
        searchFilter = true;
      }
      if (searchState != '') {
        resultArray = Query.searchByName(resultArray, searchState);
        searchFilter = true;
      }

      if (searchFilter) {
        setCurrentPage(0);
        setPages([resultArray]);
      } else setPages(Query.divideArray(resultArray, 5));
    }

  }, [searchState, filterState.Language, filterState.Region, countryData])


  const ButtonClasses = `button dark-shadow fw-bold hoverable border-radius ${mode ? 'light-element light-text' : 'dark-element dark-text'}`
  const isDisabled = currentPage == 0;

  function temp() {
    let languageArray = [];
    countryData.forEach(val => {
      if (!languageArray.includes(val.region)) languageArray.push(val.region);
      // for (const m in val.region) {
      // if (!languageArray.includes(m)) languageArray.push(m);
      // }
    })
  }

  if (countryData.length > 0) temp();


  function removeFilter(filter) {

  }

  function removeSearch() {

  }


  function returnAppliedFilters() {
    if (searchState == '' && filterState.Language.toLowerCase() == 'all' && filterState.Region.toLowerCase() == 'all') return '';

    let regFilter = '', langFilter = '', searchFilter = '';

    const filterDataClass = `filter-data hoverable border-radius dark-shadow ${mode ? 'light-element light-text' : 'dark-element dark-text'}`

    if (filterState.Region.toLowerCase() != 'all')
      regFilter = <div onClick={() => { dispatcher({ type: 'updateFilter', payload: { type: 'Region', value: 'all' } }) }} className={filterDataClass}><p><span className="fw-bold">Region:</span> {filterState.Region}</p></div>

    if (filterState.Language.toLowerCase() != 'all')
      langFilter = <div onClick={() => { dispatcher({ type: 'updateFilter', payload: { type: 'Language', value: 'all' } }) }} className={filterDataClass}><p><span className="fw-bold">Language:</span> {filterState.Language}</p></div>

    if (searchState != '')
      searchFilter = <div onClick={() => { dispatcher({ type: 'updateSearch', payload: '' }) }} className={filterDataClass}>
        <p><span className="fw-bold">Name:</span> {searchState}</p>
      </div>

    return (
      <div className='applied-filters'>
        <h1 style={{ margin: 'auto 0' }}>Applied filters:</h1>
        <div className='running-filters'>
          {searchFilter}
          {regFilter}
          {langFilter}
        </div>
      </div>
    )

  }

  const elements = pages.length == 0 ? <p>Loading..</p>
    : pages[currentPage].map(elm => {
      return <Country data={elm} />
    });

  return (
    <div className="homepage page">

      <div className="controls">

        <Search />

        <div className="controls-filter">
          <Filter elements={['Africa', "Americas", "Europe", "Oceania", "Antarctic", "Asia"]} type="Region" />
          <Filter elements={['Arabic', 'English', 'Japanese', 'Korean', 'Chinese', 'Indian', 'Spanish', 'Hebrew']} type="Language" />
        </div>

      </div>
      {returnAppliedFilters()}

      <div className="country-list">

        {elements}

      </div>

      <div className="pages">
        <button onClick={() => currentPage != 0 && setCurrentPage(currentPage - 1)} className={ButtonClasses}>{'<'}</button>
        <p>Page {currentPage + 1} of {pages.length}</p>
        <button onClick={() => currentPage != pages.length - 1 && setCurrentPage(currentPage + 1)} className={ButtonClasses}>{'>'}</button>
      </div>

    </div>
  )
}

export default HomePage
