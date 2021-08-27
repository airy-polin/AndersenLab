import React from 'react';

import './FilterForm.css';

import NumberFilter from './filters/NumberFilter';
import StringFilter from './filters/StringFilter';
import DateFilter from './filters/DateFilter';

class FilterForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isDisabled: true,
			hasErrorInputVal: false,
			filters: [
				{ key:'abv_gt',
				  value: '',
				  type: 'number',
				},
				{ key: 'abv_lt',
				  value: '',
				  type: 'number',
				},
				{ key: 'ibu_gt',
				  value: '',
				  type: 'number',
				},
				{ key:'ibu_lt',
				  value: '',
				  type: 'number',
				},
				{ key: 'ebc_gt',
				  value: '',
				  type: 'number',
				},
				{ key: 'ebc_lt',
				  value: '',
				  type: 'number',
				},
				{ key: 'yeast',
				  value: '',
				  type: 'string',
				},
				{ key: 'hops',
				  value: '',
				  type: 'string',
				},
				{ key: 'malt',
				  value: '',
				  type: 'string',
				},
				{ key: 'food',
				  value: '',
				  type: 'string',
				},
				{ key: 'ids',
				  value: '',
				  type: 'string',
				},
				{ key: 'brewed_before',
				  value: '',
				  type: 'date',
				},
				{ key: 'brewed_after',
				  value: '',
				  type: 'date',
				},
			]
		};
	}

	onFilterChangeHandler = (updFilter) => {
		const updatedFilterIndex = this.state.filters
		  .findIndex(filter => filter.key === updFilter.key);

		const result = this.state.filters.slice();
		result.splice(updatedFilterIndex, 1, updFilter);

		this.setState({
			filters: result,
		}, () => this.isFiltered());
	}

	hasErrorInputValueEntered = (errorFound) => {
		!errorFound ? this.setState({ hasErrorInputVal: true }) : this.setState({ hasErrorInputVal: false });
	}

	isFiltered = () => {
		const checkedFilters = this.state.filters.find(filter => filter.value !== '');

		(checkedFilters && !this.state.hasErrorInputVal) ? this.setState({ isDisabled: false }) : this.setState({ isDisabled: true });
	}

	onClickHandler = () => {
		const filters = this.state.filters.slice();
		this.props.onFilterChangeHandler(filters);
	}

	render() {
		const filters = this.state.filters.slice();

		const numberFilters = filters.filter(f => f.type === 'number'),
			  stringFilters = filters.filter(f => f.type === 'string'),
			  dateFilters = filters.filter(f => f.type === 'date');

		return(
			<div className='FilterForm'>
				<div className='Title'>Filter parameters</div>

				<div className='Filters'>
					{
						numberFilters.map(filter =>
							<NumberFilter
								key={filter.key}
								id={filter.key}
								name={filter.key}
								value={filter.value}
								type={filter.type}
								onFilterChangeHandler={id => this.onFilterChangeHandler(id)}
								hasErrorInputValueEntered={error => this.hasErrorInputValueEntered(error)}
							/>
						)
					}
					{
						stringFilters.map(filter =>
							<StringFilter
								key={filter.key}
								id={filter.key}
								name={filter.key}
								value={filter.value}
								type={filter.type}
								onFilterChangeHandler={id => this.onFilterChangeHandler(id)}
							/>
						)
					}
					{
						dateFilters.map(filter =>
							<DateFilter
								key={filter.key}
								id={filter.key}
								name={filter.key}
								value={filter.value}
								type={filter.type}
								onFilterChangeHandler={id => this.onFilterChangeHandler(id)}
								hasErrorInputValueEntered={error => this.hasErrorInputValueEntered(error)}
							/>
						)
					}
				</div>

				<button className='Button' onClick={this.onClickHandler} disabled={this.state.isDisabled}>Filter</button>
			</div>
		);
	};
};

export default FilterForm;