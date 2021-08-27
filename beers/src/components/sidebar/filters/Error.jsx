import React from 'react';

import './Error.css';

class Error extends React.Component {
	render() {
		return(
			<div className='Error'>
				<span>
					{ this.props.children }
				</span>
			</div>
		);
	};
};

export default Error;