// Toastfire
// A clean, simple, and customizable toast notification library!

function Toastfire(customDefaults) {
	if (typeof options === "string") {
		options = {
			"type": options
		};
	}
	this.defaults = Toastfire._helper.addObj(Toastfire.defaults, customDefaults);
}

// this method shows the toast
Toastfire.prototype.toast = function toast(options) {
	if (typeof options === "string") {
		options = {
			"message": options
		};
	}
	options = Toastfire._helper.addObj(this.defaults, options);
	
	// create toast
	var toast = document.createElement("div");
	toast.className = "toastfire toastfire-" + options.type;
	var title = document.createElement("strong");
	title.innerHTML = options.title;
	toast.appendChild(title);
	var message = document.createElement("p");
	message.innerHTML = options.message;
	toast.appendChild(message);
	document.body.appendChild(toast);
	
	return this;
};

// static defaults object
Toastfire.defaults = {
	"title": null,
	"message": null,
	"type": "default"
};

// wrapper function for basic toasting
Toastfire.toast = function toast(options) {
	return new Toastfire().toast(options);
}

// this will contain helper functions
Toastfire._helper = {};

Toastfire._helper.addObj = function addObj(original, addme) {
	var combined = original;
	if (typeof addme === "object") {
		var keys = Object.keys(addme);
		for (var i = 0; i < keys.length; i++) {
			combined[keys[i]] = addme[keys[i]];
		}
	}
	return combined;
}

console.log("Toastfire loaded!");