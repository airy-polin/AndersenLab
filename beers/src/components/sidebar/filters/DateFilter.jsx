import React from 'react';

import './DateFilter.css';

import Error from './Error';
import debounce from '../../../helpers/debounce';

class DateFilter extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: this.props.value,
			type: this.props.type,
			validationPassed: true,
		};
	}

	onFilterChangeHandler = (event) => {
		let newVal = event.target.value;
		let regexp = /^(0|1)\d-(1|2)\d{3}$/;

		if (newVal === '' || regexp.test(newVal)) {
			const updParam = {
				key: this.props.id,
				value: newVal,
				type: this.props.type,
			}
	
			this.setState({
				value: newVal,
				validationPassed: true,
			}, this.props.hasErrorInputValueEntered(this.state.validationPassed));
			this.props.onFilterChangeHandler(updParam);
		} else {
			this.setState({
				validationPassed: false
			}, this.props.hasErrorInputValueEntered(this.state.validationPassed));
		}
	};

	onFilterChangeHandlerDebounced = debounce(this.onFilterChangeHandler, 1000);

	render() {
		return(
			<div className='Filter'>
				<div className='DateFilter'>
					<label htmlFor={this.props.id}>{this.props.name}</label>
					<input type='text' id={this.props.id} defaultValue={this.state.value} onChange={this.onFilterChangeHandlerDebounced} />
				</div>

				{
				!this.state.validationPassed &&
				<Error>
					Expected date format is mm-yyyy e.g 10-2011
				</Error>
				}
			</div>
		);
	};
};

export default DateFilter;