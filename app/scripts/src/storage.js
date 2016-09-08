/*
  Store
   a thin wrapper around a given WebStorage API
  
   NOT INTENDED TO BE USED ON ITS OWN
   meant to be subclassed
*/
class Store {
    constructor(storageApi) {
	this.api = storageApi;
    }
    get() {
	return this.api.getItem(this.key);
    }
    set(value) {
	this.api.setItem(this.key, value);
    }
}

export class UserStore extends Store {
    constructor(key) {
	super(sessionStorage);
	this.key = key;
    }
}
