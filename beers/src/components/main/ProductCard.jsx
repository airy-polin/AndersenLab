import React from 'react';
import PropTypes from 'prop-types';

import './ProductCard.css';

class ProductCard extends React.Component {
	static propTypes = {
		name: PropTypes.string.isRequired,
		id: PropTypes.number.isRequired,
		firstBrewed: PropTypes.any.isRequired,
		tagline: PropTypes.string.isRequired,
		image: PropTypes.string,
	};

	render() {
    // тут стоит деструктуризировать пропсы
		return (
			<div className='ProductCard' id={this.props.id}>
				<div className='Media'>
					<img src={this.props.image} alt='product' />
				</div>

				<div className='Info'>
					<div className='Title'>
						<span>{this.props.name}</span>
					</div>

					<div className='Notes'>
						<div className='NoteItem'>
							<span>id:</span>
							<span>{this.props.id}</span>
						</div>

						<div className='NoteItem'>
							<span>first brewed:</span>
							<span>{this.props.firstBrewed}</span>
						</div>

						<div className='NoteItem'>
							<span>tagline:</span>
							<span>{this.props.tagline}</span>
						</div>
					</div>
				</div>
			</div>
		);
	};
};

export default ProductCard;
