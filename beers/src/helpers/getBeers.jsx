export default function getBeers(filters) {
	// debugger;
	let checkedFilters = '';
	if (filters) {
		checkedFilters = filters
			.filter(filter => filter.value !== '')
			.map(param => `${param.key}=${param.value}`)
			.join('&');
	}

	return fetch(`https://api.punkapi.com/v2/beers${checkedFilters ? '?' : ''}${checkedFilters}`)
		.then(response => response.json())
		.catch(error => console.log(error));
}