import Xray from 'x-ray';

class AbstractScraper {
	constructor(searchTerm, descriptions) {
		this.searchTerm = searchTerm;
		this.descriptions = descriptions;
		this.x = new Xray();
		if (this === AbstractScraper) {
			throw new TypeError("Cannot construct AbstractScraper instances directly");
		}
	}
	getSearchURL(formattedTerm) {
		throw new TypeError("getSearchURL must be overridden");
	}
	getSeperator() {
		throw new TypeError("getSeprator must be overridden");
	}
	getScope() {
		throw new TypeError("getScope must be overridden");
	}
	match(product) {
		if (!this.descriptions) {
			throw new TypeError("Must initialize description");
		}
		for (let i = 0; i < this.descriptions.length; i++) {
			const description = this.descriptions[i].toLowerCase();

			if (product.name.toLowerCase().indexOf(description) <= -1) {
				return false;
			}
		}
		return true;
	}
	findOne(obj) {
		const {products} = obj;
		console.log(products.length);

		for (let i = 0; i < products.length; i++) {
			if (this.match(products[i])) {
				if (products[i].stock) {
					return products[i];
				} else {
					return {message: 'out of stock'}
				}
			}
		}

		return {error: 'no result found'};
	}

	scrape() {
		const seperator = this.getSeperator();
		console.log(this.searchTerm);

		const formattedTerm = this.searchTerm.split(' ').join(seperator);
		const url = this.getSearchURL(formattedTerm);
		console.log(url);

		this.x(url, this.getScope())(function(err, obj) {
			console.log(this.findOne(obj));
		}.bind(this));
	}

}

export default AbstractScraper;
