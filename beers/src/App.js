import React from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

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
			searchVal: [
        { key: 'beer_name',
          value: '',
        },
      ],
		};
	}

  fetchBeers = (params) => {
    let defaultFilters = params;
    if (!params) {
      defaultFilters = [
        {
          key: 'page',
          value: this.state.currentPage,
        },
        {
          key: 'per_page',
          value: this.state.pageSize,
        }
      ];
    }
    // const defaultFilters = [
    //   {
    //     key: 'page',
    //     value: this.state.currentPage,
    //   },
    //   {
    //     key: 'per_page',
    //     value: this.state.pageSize,
    //   }
    // ];

    getBeers(defaultFilters)
    .then(data => this.setState({
      beers: data,
      totalProductsCount: data.length,
    }));
	}

  componentDidMount() {
    this.fetchBeers();
  }

  renderPage = (event) => {
    // debugger;
    let clickedPage = event.target.innerText;
    this.setState({ currentPage: clickedPage });

    this.fetchBeers(); //
  }

  onSearchInputChangeHandler = (newSearchVal) => { // (searchedBeers)
    // this.setState({
    //   beers: searchedBeers,
    //   totalProductsCount: searchedBeers.length,
    // });

    // debugger; //
    this.setState({
      searchVal: newSearchVal
    });
    this.fetchBeers(newSearchVal);
  }

  onFilterChangeHandler = (filteredBeers) => {
    this.setState({
      beers: filteredBeers,
      totalProductsCount: filteredBeers.length,
    });
  }

  render() {
    // debugger;
    // let pagesCount = Math.ceil(this.state.totalProductsCount / this.state.pageSize);
    let pagesCount = 3; //
    const pages = [];

    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }

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
          <div className='Pagination' onClick={this.renderPage}>
              {
                pages.map(p =>
                  <span className={this.state.currentPage === p && 'selected'} key={p}>
                    {p}
                  </span>
                )
              }
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