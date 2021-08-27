import React from 'react';

import './SearchField.css';

import debounce from '../../helpers/debounce';

class SearchField extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			searchVal: this.props.searchVal,
		};
	}

	onSearchInputChangeHandler = (event) => {
		let updValue = event.target.value;
		const newSearchVal = [
			{key: 'beer_name', value: updValue,},
		];
		this.setState({ searchVal: newSearchVal });

		this.props.onSearchInputChangeHandler(newSearchVal);
	}

	onSearchInputChangeHandlerDebounced = debounce(this.onSearchInputChangeHandler, 200);

	render() {
		return(
			<div className='SearchField'>
				<input type='text' placeholder='Search by Beer Name...' defaultValue={this.state.searchVal.value} onChange={this.onSearchInputChangeHandlerDebounced} />
			</div>
		);
	};
};

export default SearchField;