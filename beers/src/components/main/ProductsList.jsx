import React from 'react';

import './ProductsList.css';

import ProductCard from './ProductCard';

class ProductsList extends React.Component {
	render() { 
		return (
			<div className='ProductsList'>
				{
					this.props.beers.map (product => 
						<ProductCard
							key={product.id}
							name={product.name}
							id={product.id}
							firstBrewed={product['first_brewed']}
							tagline={product.tagline}
							image={product['image_url']}
						/>
					)
				}
			</div>
		);
	};
};

export default ProductsList;