import AbstractScraper from './scraper';
import Xray from 'x-ray';

class AmcalScraper extends AbstractScraper {
	constructor(searchTerm, description) {
		super(searchTerm, description);
	}
	getSearchURL(formattedTerm) {
		return `http://www.amcal.com.au/brands/SearchDisplay?searchTerm=${formattedTerm}`;
	}
	getSeperator() {
		return '%20';
	}
	getScope() {
		const products = {
			products: this.x('.product_listing_container .product', [{
				name: '.product_name a',
				price: '.price_display .price',
				stock: '.button_text'
			}])
		};
		return products;
	}
	findOne(obj) {
		const {products} = obj;
		console.log(products.length);

		for (var i = 0; i < products.length; i++) {
			if (this.match(products[i])) {
				if (products[i].stock === 'Add To Basket') {
					return products[i];
				} else {
					return {message: 'out of stock'};
				}
			}
		}
		return {error: 'no result found'};
	}
}

Meteor.methods({
	'start_scraper':function(){
		const scraper = new AmcalScraper("swisse grape seed", ['grape seed', '180 Tablets']);
		scraper.scrape();
	}
});
