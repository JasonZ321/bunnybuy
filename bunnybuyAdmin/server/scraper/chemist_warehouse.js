import AbstractScraper from './scraper';
import Xray from 'x-ray';

class ChemistWarehouseScraper extends AbstractScraper {
	constructor(searchTerm, description) {
		super(searchTerm, description);
	}
	getSearchURL(formattedTerm) {
		return `https://www.chemistwarehouse.com.au/search?searchtext=${formattedTerm}&searchmode=allwords`;
	}
	getSeperator() {
		return '%20';
	}
	getScope() {
		const products = {
			products: this.x('.product-container', [{
				name: '.product-name',
				price: '.prices .Price'
			}])
		};
		return products;
	}
	findOne(obj) {
		const {products} = obj;
		console.log(products.length);

		for (var i = 0; i < products.length; i++) {
			if (this.match(products[i])) {
				return products[i];
			}
		}
		return {error: 'no result found'};
	}
}

// Meteor.methods({
// 	'start_scraper':function(){
// 		const scraper = new ChemistWarehouseScraper("aptamil gold", ['aptamil', 'gold+ 4']);
// 		scraper.scrape();
// 	}
// });
