import React from 'react';

import './App.css';

import getBeers from './helpers/getBeers';

import SearchField from './components/sidebar/SearchField';
import FilterForm from './components/sidebar/FilterForm';

import ProductsList from './components/main/ProductsList';

class App extends React.Component {
  constructor(props) {
		super(props);

		this.state = {
			beers: [],
      pageSize: 10,
      totalProductsCount: 0,
      currentPage: 1,
      isFiltered: false,
      filters: [],
			searchVal: [
        { key: 'beer_name',
          value: '',
        },
      ],
		};
	}

  fetchBeers = (params) => {
    const defaultFilters = [
      {
        key: 'page',
        value: this.state.currentPage,
      },
      {
        key: 'per_page',
        value: this.state.pageSize,
      }
    ];
    const result = params ? defaultFilters.concat(params) : defaultFilters;

    getBeers(result)
    .then(data => this.setState({
      beers: data,
      totalProductsCount: data.length,
    }));
	}

  componentDidMount() {
    this.fetchBeers();
  }

  renderItemsPerPage = (event) => {
    this.setState({
      pageSize: event.target.value
    }, () => this.fetchBeers());
  }

  slidePageToTheRight = () => {
    this.setState({
      currentPage: this.state.currentPage + 1
    }, () => this.fetchBeers());
  }

  slidePageToTheLeft = () => {
    this.setState({
      currentPage: this.state.currentPage - 1
    }, () => this.fetchBeers());
  }

  onSearchInputChangeHandler = (newSearchVal) => {
    let result = (this.state.isFiltered) ? this.state.filters.concat(newSearchVal) : newSearchVal;

    this.setState({
      searchVal: result
    }, () => this.fetchBeers(result));
  }

  onFilterChangeHandler = (filters) => {
    const isFiltered = filters.find(filter => filter.value !== '');

    if (isFiltered) {
      this.setState({
        isFiltered: true,
        filters: filters
      }, () => this.fetchBeers(filters));
    }
  }

  render() {
    let isHomePage = (this.state.currentPage === 1) ? true : false;

    return (
      <div className='App'>
        <aside className='Sidebar'>
          <SearchField
            searchVal={this.state.searchVal}
            onSearchInputChangeHandler={beers => this.onSearchInputChangeHandler(beers)}
          />
          <FilterForm
            onFilterChangeHandler={beers => this.onFilterChangeHandler(beers)}
          />
        </aside>

        <main className='Main'>
          <div className='Navigation'>
            <div className='SliderButtons'>
              <button type='button' disabled={isHomePage} onClick={this.slidePageToTheLeft}>prev</button>
              <span>{this.state.currentPage}</span>
              <button type='button' onClick={this.slidePageToTheRight}>next</button>
            </div>

            <div className='Options' onChange={this.renderItemsPerPage}>
              <select defaultValue={this.state.pageSize}>
                <option defaultValue={6}>6</option>
                <option defaultValue={8}>8</option>
                <option defaultValue={10}>10</option>
              </select>
            </div>
          </div>

          <ProductsList
            beers={this.state.beers}
          />
        </main>
      </div>
    );
  }
};

export default App;