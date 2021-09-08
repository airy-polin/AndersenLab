import React from 'react';

import './NumberFilter.css';

import Error from './Error';

class NumberFilter extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: this.props.value,
			type: this.props.type,
			validationPassed: true,
		};
	}

  // код очень похож на код в DateFilter, возможно можно что-то вынести и переиспользовать?
	onFilterChangeHandler = (event) => {
		let newVal = event.target.value;

		if (newVal === '' || Number(newVal)) {
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

	render() {
		return(
			<div className='Filter'>
				<div className='NumberFilter'>
					<label htmlFor={this.props.id}>{this.props.name}</label>
					<input type='text' id={this.props.id} defaultValue={this.state.value} onChange={this.onFilterChangeHandler} />
				</div>

				{
				!this.state.validationPassed &&
				<Error>
					Incorrect value. Should be a number
				</Error>
				}
			</div>
		);
	};
};

export default NumberFilter;
