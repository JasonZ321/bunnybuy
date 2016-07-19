import AbstractScraper from './scraper';
import Xray from 'x-ray';

class PriceLineScraper extends AbstractScraper {
	constructor(searchTerm, description, brand) {
		super(searchTerm, description, brand);
		this.brand = brand;
	}
	getSearchURL(formattedTerm) {
		return `https://www.priceline.com.au/search/?q=${formattedTerm}`;
	}
	getSeperator() {
		return '+';
	}
	match(product) {
		return super.match() && product.brand.toLowerCase().indexOf(this.brand) > -1;
	}
	getScope() {
		return {
			products: this.x('.products-grid .type-simple', [{
				brand: '.product-brand',
				name: '.product-link',
				price: '.price-box .price',
				stock: '.actions button span'
			}])
		};
	}
}

// Meteor.methods({
// 	'start_scraper':function(){
// 		const scraper = new PriceLineScraper("Karicare stage 1", ["stage 1"], "brand");
// 		scraper.scrape();
// 	}
// });
