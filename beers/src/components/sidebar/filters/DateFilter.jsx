import React from 'react';

import './DateFilter.css';

class DateFilter extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: this.props.value,
			type: this.props.type,
		};
	}

	onFilterChangeHandler = (event) => {
		let newVal = event.target.value;
		const updParam = {
			key: this.props.id,
			value: newVal,
			type: this.props.type,
		}

		this.setState({
			value: newVal,
		});
		this.props.onFilterChangeHandler(updParam);
	};

	render() {
		return(
			<div className='DateFilter'>
				<label htmlFor={this.props.id}>{this.props.name}</label>
				<input type='text' id={this.props.id} defaultValue={this.state.value} onChange={this.onFilterChangeHandler} />
			</div>
		);
	};
};

export default DateFilter;