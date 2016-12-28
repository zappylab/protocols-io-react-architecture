import {_pages} from './PageConstants';
// Singleton instance
let _instance;

class Router {
	constructor(pages) {
		super();
		this.pages = {};
		this.assign(pages);
	}

	// we want to assign array of pages to our class,
	// also if page have flag original we set it as default page
	assign(pages) {
		for (let key in pages) {
			this.pages[key] = new Page(pages[key]);
			if (pages[key].original) {
				this.page = pages[key];
			}
		}
	}

	// method to check if page is valid and array of pages contains it
	is(page) {
		if (page) {
			return this.page.constant == page.constant;
		} else {
			return false;
		}
	}

	// method to set current page (private one)
	set_page(page) {
		this.page = page;
	}

	// method to set current page (public one)
	change_page(page) {
		if (page && this.get_page(page.constant)) {
			this.set_page(page);
		} else {
			console.error("Router: undefined page. Check page:", page);
		}
	}

	// set page by url
	set_by_url(url) {
		let page = this.get_page_by_url(url);
		
		if (page) {
			this.page = page;
			return true;
		} else {
			return false;
		}
	}

	// method to get page meta by key
	get_page(key) {
		if (this.pages[key.toUpperCase()]) {
			return this.pages[key.toUpperCase()];
		} else {
			for (let i in this.pages) {
				if (this.pages[i].check_url(key)) {
					return this.pages[i];
					break;
				}
			}
		}

		return false;
	}

	get_page_by_url(url) {
		let urls = url.split("/");
		let page = urls[1] ? urls[1] + (urls[2] ? '/' : '') : '/';

		return this.get_page(page);
	}
}

// sinple class for Page
class Page {
	constructor(data) {
		Object.assign(this, data);
	}

	check_url(url) {
		return this.urls.find((element) => {
			return element.toLowerCase() == url.toLowerCase();
		});
	}
}

if (!_instance) _instance = new Router(_pages);
export default _instance;